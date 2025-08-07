'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import React, { useState } from 'react';
import { AnimatePresence, motion, easeInOut } from "framer-motion";
import { GoArrowRight, GoChevronRight } from "react-icons/go";
import Link from 'next/link';

export default function SignInPage() {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className='flex w-screen h-screen items-center justify-center'>
            <SignIn.Root>
                <SignIn.Step
                    name="start"
                    className="authContainer"
                >
                    <div className='authTitle items-center'>
                        Login
                    </div>

                    <Clerk.Field name="identifier" className="authField">
                        <Clerk.Label className="authLabel">Username</Clerk.Label>
                        <Clerk.Input className="authInput" />
                        <Clerk.FieldError className="authError" />
                    </Clerk.Field>

                    <Clerk.Field name="password" className="authField">
                        <Clerk.Label className="authLabel">Password</Clerk.Label>
                        <Clerk.Input className="authInput" validatePassword />
                        <Clerk.FieldState>
                            {({ message }) => (
                                <pre className="authError">{message}</pre>
                            )}
                        </Clerk.FieldState>
                    </Clerk.Field>


                    <SignIn.Action
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        submit
                        className="authAltButton"
                    >
                        Continue
                        <AnimatePresence mode="wait" initial={false}>
                            {isHovered ? (
                                <motion.div
                                    key="chevron"
                                    initial={{ opacity: 0, x: -2 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 2 }}
                                    transition={{ duration: 0.1, easeInOut }}
                                    className="inline ml-2"
                                >
                                    <GoArrowRight />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="arrow"
                                    initial={{ opacity: 0, x: -2 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 2 }}
                                    transition={{ duration: 0.1, easeInOut }}
                                    className="inline ml-2"
                                >
                                    <GoChevronRight />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </SignIn.Action>

                    <div className='authDividerContainer'>
                        <div className='authDivider' />
                        <div className='authDividerCentralText'>
                            OR
                        </div>
                        <div className='authDivider' />
                    </div>

                    <Link href='/register' className='authAltButton'>
                        Register
                    </Link>
                </SignIn.Step>
            </SignIn.Root>
        </div>
    )
}

