import React from 'react'

function PrivacyPolicy() {
    return (
        <div className='flex flex-col w-screen h-screen bg-bg items-center justify-center px-24'>
            <div className='flex flex-col w-full lg:w-[60%] items-center justify-center gap-4 text-pretty'>
                <h2 className='animate-gradient w-full text-center'>Privacy policy.</h2>
                <p className='navDropdownCaption mb-8 w-full justify-center text-center'>Last updated January 24, 2025</p>
                <p className='text-sm font-light leading-6 w-full text-left'>
                    By submitting this form, you agree and consent to your personal data which you provide to the School of Electrical and Electronic Engineering ("EEE") in this form being processed, collected, used and/or retained by EEE and/or NTU for one or more of the Purposes.
                </p>
                <p className='text-sm font-light leading-6 w-full text-left'>
                    1. Administering the award,
                </p>
                <p className='text-sm font-light leading-6 w-full text-left'>
                    2. Promotional, marketing and publicity purposes relating to scholarships and EEE generally, and
                </p>
                <p className='text-sm font-light leading-6 w-full text-left'>
                    3. Reference and archival purposes, in accordance with NTU's policies and processes relating to personal data protection.
                </p>
            </div>
        </div>
    )
}

export default PrivacyPolicy