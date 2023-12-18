import React from 'react'

function MainImage(props) {
    return (
        <div style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0)
        39%, rgba(0,0,0,0)
        41%, rgba(0,0,0,0.65)
        100%)`,
            height: '500px',
            backgroundImage: `url('${props.image}')`,
            backgroundColor: '#1c1c1c',
            backgroundSize: '100%, cover',
            backgroundPosition: 'center, center',
            width: '100%',
            position: 'relative',
            filter: 'grayscale(50%)'

        }}>
            <div style={{
                position: 'absolute', padding: '2em', width: '100%', bottom: '0', left: '0'
            }}>
                <h3 style={{ color: 'white', fontSize: '1.2rem' }}>{props.tagline}</h3>
                <h2 style={{ color: 'white', fontSize: '1.6rem' }}>{props.title}</h2>
                <p style={{ maxWidth: '500px', color: 'white', fontSize: '1rem' }}>{props.text}</p>

            </div>
        </div>
    )
}

export default MainImage;