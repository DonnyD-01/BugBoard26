import React from 'react';

export default function NoResultMessage({message}) {
    return (
        <div className="no-results">
            <img className="no-results__img" src="/Logo/LogoInfo.png" />
            {message}
        </div>
    )
}