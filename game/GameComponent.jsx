"use client";
import React, { useEffect, useState, useRef } from 'react';
import * as Phaser from 'phaser';
import MainMenu from './scenes/MainMenu';
import GameScene from './scenes/Game';
import GameOver from './scenes/GameOver';
import axios from 'axios';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import { useUser } from '@clerk/clerk-react';

const GameComponent = ({ pause }) => {
    const [score, setScore] = useState(0);
    const [playerData, setPlayerData] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const gameRef = useRef(null);
    const containerRef = useRef(null);
    const { user, isSignedIn } = useUser();

    const savePlayerData = async () => {
        try {
            if (gameOver && playerData && isSignedIn) {
                await axios.post('/api/playerData', {
                    playerData, username: user?.username 
                });
            }
        } catch (error) {
            console.error("Error saving player data:", error);
        }
    };

    const saveHighScore = async () => {
        try {
            if (gameOver && score && isSignedIn && user) {
                const response = await axios.post('/api/leaderboard', {
                    username: user.username,
                    highScore: score,
                });
            }
        } catch (error) {
            console.error('Error saving high score:', error.response || error);
        }
    };

    const fetchHighScore = async () => {
        try {
            if (isSignedIn && user?.username) {
                const response = await axios.get(`/api/highscore/${user.username}`, {
                    headers: {
                        'Cache-Control': 'no-cache',
                    },
                });
                return response.data.highScore || 0;
            } else {
                console.error("Missing username");
                return 0;
            }
        } catch (error) {
            console.error("Error fetching high score:", error);
            return 0;
        }
    };

    useEffect(() => {
        if (gameOver) {
            savePlayerData();
            saveHighScore();
        }
    }, [gameOver]);

    useEffect(() => {
        if (gameRef.current) return; // Prevent reinitialization
    
        const isPhoneViewport = document.documentElement.clientWidth <= 1024;
    
        const config = {
            type: Phaser.AUTO,
            pixelArt: true,
            width: 500,
            height: 500,
            audio: {
                disableWebAudio: true,
            },
            backgroundColor: '#111111',
            roundPixels: true,
            physics: {
                default: 'arcade',
                arcade: { gravity: { y: 0 }, debug: false },
            },
            scene: [MainMenu, GameScene, GameOver],
            plugins: {
                global: [{
                    key: 'rexVirtualJoystick',
                    plugin: VirtualJoystickPlugin,
                    start: true
                }]
            },
            callbacks: {
                preBoot: (game) => {
                    game.registry.set('isPhoneViewport', isPhoneViewport);
                },
                postBoot: (game) => {
                    const mainMenuScene = game.scene.getScene('MainMenuScene');
                    const gameScene = game.scene.getScene('GameScene');
    
                    gameScene.setPlayerDataFunction(setPlayerData);
                    gameScene.setScoreFunction(setScore);
                    gameScene.setGameOverFunction(setGameOver);
                    gameScene.setFetchHighScore(fetchHighScore);
                    gameScene.setPhoneViewport(isPhoneViewport);
                    mainMenuScene.setPhoneViewport(isPhoneViewport);
                },
            },
        };
    
        gameRef.current = new Phaser.Game(config);
        const gameContainer = document.getElementById('game-container');
        gameContainer.appendChild(gameRef.current.canvas);
    
        const handleResize = () => {
            if (gameRef.current) {
                gameRef.current.scale.resize(
                    document.documentElement.clientWidth <= 1024 ? 400 : 500,
                    document.documentElement.clientWidth <= 1024 ? 400 : 500
                );
            }
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, []);
    
    

    useEffect(() => {
        if (gameRef.current) {
            if (pause) {
                gameRef.current.scene.pause('GameScene');
            } else {
                gameRef.current.scene.resume('GameScene');
            }
        }
    }, [pause]);

    return (
        <div className="flex justify-center items-center">
            <div id="game-container" className="flex" />
        </div>
    );
};

export default GameComponent;
