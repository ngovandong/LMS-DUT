import styled from 'styled-components'

export const HamburguerButton =  styled.button`
  height: 40px;
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  flex: 0 0 40px;
  border-radius: 12px;
  cursor: pointer;

  :hover {
    background: var(--brand-50);
  }

  div{
    height: 2px;
    width: 21px;
    background: var(--text-secondary);
    margin-top: 4px;
    border-radius: 2px;

    transition: transform ease-in-out .2s;

    :nth-of-type(1){
      transform: ${({show}) => show ? 'rotate(45deg)' : 'rotate(0deg)'};
      position: relative;
      top: ${({show}) => show ? '6px' : '0'};
    }

    :nth-of-type(2){
      transform: ${({show}) => show ? 'translateX(-250%)' : 'translateX(0%)'};
    }

    :nth-of-type(3){
      transform: ${({show}) => show ? 'rotate(-45deg)' : 'rotate(0deg)'};
      position: relative;
      bottom: ${({show}) => show ? '6px' : '0'};
    }
  }

`
