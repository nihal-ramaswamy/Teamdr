import styled from 'styled-components'

export const MobileContainer =  styled.div`

    @media (min-width: 850px) {
        display: none;
    }
    position: sticky;
    top: -2vmin;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    background: white;
`;

export const DesktopContainer =  styled.div`

    @media (max-width: 850px) {
        display: flex;
    }
    position: sticky;
    top: 0;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    background: white;
`;