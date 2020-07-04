import React, {useContext, useState, useEffect} from 'react';
import {Context} from '../store/Store'

export const CanditateDetails = (props) => {
    const [state, dispatch] = useContext(Context)
    
  return (
    <>
      <h1>{state.candidateDetails}</h1>
    </>
  );
};