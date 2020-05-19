import React, { FC, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import styled, { StyledComponent } from '@emotion/styled';
import {
  background,
  border,
  color,
  compose,
  layout,
  position,
  shadow,
  space,
  typography
} from 'styled-system';
import useColor from '../hooks/useColor';
import { ButtonProps, StyledButtonProps } from './buttonProps';

export type DetailedHTMLButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const HTMLButton: StyledComponent<
  DetailedHTMLButtonProps,
  StyledButtonProps,
  object
> = styled.button(
  compose(
    background,
    border,
    color,
    layout,
    position,
    shadow,
    space,
    typography
  )
);

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const color = useColor(props);

  const clonedProps: ButtonProps = {
    color,
    ...props
  };
  delete clonedProps.autoContrast;
  delete clonedProps.onPress;
  delete clonedProps.onPressIn;
  delete clonedProps.onPressOut;
  delete clonedProps.styled;
  delete clonedProps.theme;
  delete clonedProps.uppercase;

  function handleClick(_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (props.onPress) props.onPress();
  }

  function handleMouseDown(
    _e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if (props.onPressIn) props.onPressIn();
  }

  function handleMouseUp(_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (props.onPressOut) props.onPressOut();
  }

  return (
    <HTMLButton
      {...(clonedProps as DetailedHTMLButtonProps)}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  );
};

Button.defaultProps = {
  backgroundColor: 'primary',
  borderRadius: 2,
  borderWidth: 0,
  children: '',
  fontFamily: 'body',
  fontSize: 2,
  fontWeight: 'body',
  lineHeight: 'body',
  paddingBottom: 2,
  paddingLeft: 2,
  paddingRight: 2,
  paddingTop: 2,
  styled: false,
  uppercase: true,
  width: '100%'
};

export default styled(Button)`
  cursor: pointer;
  font-weight: 500;
  transition-duration: 0.25s;
  transition-property: opacity;
  :active {
    opacity: 0.8;
  }
  text-transform: ${({ uppercase }: ButtonProps) =>
    uppercase ? 'uppercase' : 'none'};
`;
