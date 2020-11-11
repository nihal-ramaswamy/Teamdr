import styled from 'styled-components'

export const PrimaryButton = styled.div`

    text-align: center;
    padding: 2px 25px;
    border-radius: 10px;
    color: var(--primary-text);
    border: none;
    font-weight: 700;
    margin-top:5px;

    background-image: linear-gradient(to top right, var(--aditional-hover-text-2), var(--tertiary-hover-text));

    &:hover {
        background: var(--primary-hover-text);
        background-image: none;
    }

    transition: all .2s ease;
    cursor: pointer;

`;

export const SecondaryButton = styled.div`

    text-align: center;
    padding: 2px 10px;
    border-radius: 10px;

    color: var(--additional-hover-text-1);
    border: 1px solid var(--secondary-hover-text);
    font-weight: 700;
    
    &:hover {
        color: var(--secondary-text);
        border: none;
        background-color: var(--secondary-hover-text);
    }

    transition: all .2s ease;

    cursor: pointer;  

`;

export const TertiaryButton = styled.div`

    text-align: center;
    padding: 2px 10px;
    border-radius: 10px;

    color: var(--primary-text);
    border: 1px solid var(--primary-color-dark);
    font-weight: 700;
    
    &:hover {
        color: var(--secondary-text);
        background-color: var(--secondary-hover-text);
    }

    transition: all .2s ease;

    cursor: pointer;  

`;

export const PostButton = styled.div`

`;