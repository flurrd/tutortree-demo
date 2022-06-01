import React from 'react';
import Button from './Button';
import "../index.css";

const Header = ({ showForm }) => {
    return (
        <>
            <header className="header">
                <h1 className="app-header">Maths for 'em</h1>
                <Button onClick={showForm} className={'btn btn-dark btn--large'} text={'New Post'} />
            </header>
            
            <style jsx>
            {`
                .header {
                    background-color: var(--header-color);
                    color: var(--theme-color-white);
                    padding: 3rem 5rem;
                    border-radius: 2rem;
                    position: absolute;
                    margin-top: 1rem;
                    width: 100%;
                    max-width: 1000px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }

                .header h1 {
                    font-size: 2.5rem;
                }
            `}
            </style>
        </>
    )
}

export default Header;
