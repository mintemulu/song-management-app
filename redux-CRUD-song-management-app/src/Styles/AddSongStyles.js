/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
export const containerStyle = css`
  padding: 2rem;
`;

export const rowStyle = css`
  margin-bottom: 1rem;
`;

export const labelStyle = css`
  display: block;
  margin-bottom: 0.5rem;
`;

export const inputStyle = css`
  width: 15%;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

export const errorStyle = css`
  color: red;
`;
export const audioPreviewContainer = css`
  display: flex;
  align-items: center; 
  margin-bottom: 1rem; 
  
  input[type="file"] {
    margin-right: 1rem; 
  }
`;

export const buttonStyle = css`
    display:block;
    
  color: #FFF;
    background-color: #33C3F0;
    border-color: #33C3F0;
    height: 38px;
    padding: 0 20px;
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    line-height: 38px;
    letter-spacing: .1rem;
    text-transform: uppercase;
    text-decoration: none;
    white-space: nowrap;
    cursor:pointer;
    border-radius: 4px;
    border: 1px solid #bbb;
    box-sizing: border-box;
     transition: background-color 0.3s; /* Smooth transition */

  &:hover {
    background-color: #2aa6cc; /* Darker shade on hover */
  }
`;