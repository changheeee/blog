import React, { useState } from 'react';

function GridCards(props) {
    // 마우스 호버 상태를 관리하는 상태 변수
    const [isHovered, setIsHovered] = useState(false);

    // 마우스 호버 상태가 변경될 때 호출되는 함수
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    // 마우스 호버 상태가 변경될 때 호출되는 함수
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    if (props.landingPage) {
        return (
            <>
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ position: 'relative' }}
                >
                    {/* 마우스 호버 상태에 따라 영화 정보를 표시하는 조건부 렌더링 */}
                    {isHovered && (
                        <a href={`/movie/${props.movieId}`}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '10px',
                                width: '100%',
                                height: '320px',
                                textAlign: 'center',
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                color: '#fefefe',
                                backgroundColor: '#0000007f',
                            }}
                        >
                            <b style={{ fontSize: '1.2em' }}>{props.movieNameKo}</b>
                        </a>
                    )}

                    {/* 영화 포스터 이미지 */}
                    <div>
                        <img style={{
                            minWidth: '230px',
                            width: '100%',
                            height: '320px',
                            marginBottom: '1em'
                        }} src={props.image} alt={props.movieName} />
                    </div>
                </div >
            </>
        );
    } else {
        return (
            <div >
                <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ position: 'relative' }}>
                    {isHovered && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '10px',
                            width: '100%',
                            height: '320px',
                            textAlign: 'center',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            color: '#fefefe',
                            backgroundColor: '#0000007f',
                            letterSpacing: '-0.04em'
                        }}>
                            <span style={{ alignSelf: 'flex-start', opacity: '0.7' }}>{props.character}</span>
                            <strong style={{ fontSize: '1.2em', alignSelf: 'flex-end', opacity: '0.9' }}>{props.charactorName}</strong>
                        </div>
                    )}
                    {/* 캐릭터 포스터 이미지 */}
                    <img style={{ minWidth: '230px', width: '100%', height: '320px', marginBottom: '1em' }} src={props.image} alt={props.charactorName} />
                </div>
            </div>
        );
    }
}

export default GridCards;
