import React from 'react'

function GridCards(props) {
    if (props.landingPage) {
        return (
            <div>
                <div >
                    <a href={`/movie/${props.movieId}`} >
                        <img style={{
                            minWidth: '230px',
                            width: '100%',
                            height: '320px',
                            marginBottom: '1em'
                        }} src={props.image} alt={props.movieName} />
                    </a>
                </div>
            </div>
        )
    } else {
        return (
            <div >
                <div>
                    <img style={{ minWidth: '230px', width: '100%', height: '320px', marginBottom: '1em' }} src={props.image} alt={props.charactorName} />
                </div>
            </div>
        )
    }
}

export default GridCards