import styled from 'styled-components'

const PreferenceCard = styled.div`

    margin: 5px;
    border-radius: 10px;
    width: 16vw;
    height: 16vh;

    color: var(--secondary-text);
    text-shadow: 1px 1px var(--secondary-text-dark-2);
    font-weight: 700;
    background-image: linear-gradient(to bottom, #000000${props => props.selected ? 'bb' : '3a'}, #000000${props => props.selected ? 'bb' : '3a'}), url(${props => props.image});
    background-size: cover;
    letter-spacing: 1px;

    cursor: pointer;

    &:hover {
        opacity: 1;
        background-image: none;
        background-color: var(--primary-hover-text);
    }

    padding-top: 30%;
    padding-left: 10%;

    @media (max-width: 850px) {
        width: 60vw;
        height: 10vh;
        padding-top: 20%;
    }
    
`;

export default PreferenceCard;