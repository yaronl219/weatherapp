import React from 'react';
import { useHistory } from 'react-router-dom';
const weatherImg = require('../assets/imgs/weather.svg')

export function EmptyState() {

    const history = useHistory()

    return (
        <div className="favorites-empty-state">
            <h2>Oops! looks like you havent added any favorites yet</h2>
            <h3 className="cta" onClick={() => history.push('/city')}>Why not add some now?</h3>
            <div className="empty-state-img">
                <img src={weatherImg} alt="empty-state-img" />
            </div>
        </div>
    )
}
