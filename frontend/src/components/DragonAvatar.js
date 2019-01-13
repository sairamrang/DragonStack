import React, { Component } from 'react';
import { skinny, slender, sporty, stocky, polka, plain, checked, striped } from '../assets';

const propertyMap = {
  backgroundcolor: {
    black: '#263238',
    white: '#cfd8dc',
    green: '#a5d6a7',
    blue: '#0277bd'
  },
  build: { slender, stocky, sporty, skinny },
  pattern: { plain, striped, checked, polka },
  size: { small: 100, medium: 140, large: 180, extralarge: 220 }
};

let increment = 0;

class DragonAvatar extends Component {
  get DragonImage() {
    const dragonPropertyMap = {};

    this.props.dragon.traits.forEach(trait => {
      const { traitType, traitvalue } = trait;
      dragonPropertyMap[traitType] = propertyMap[traitType][traitvalue];
    });

    const { backgroundcolor, build, pattern, size } = dragonPropertyMap;
  
    const sizing = { width: size, height: size };

    return (
      <div className='dragon-avatar-image-wrapper'>
        <div className='dragon-avatar-image-background' style={{ backgroundcolor  , ...sizing }}></div>
        <img src={pattern} className='dragon-avatar-image-pattern' style={{ ...sizing }} />
        <img src={build} className='dragon-avatar-image' style={{ ...sizing }} />
      </div>
    );
  }

  render() {
    const { generationId, dragonId, traits } = this.props.dragon;
    // console.log (`this.props.dragon ${increment++}`, this.props.dragon);
    if (!dragonId) return <div></div>;

    return (
      <div>
        <span>G{generationId}.</span>
        <span>I{dragonId}. </span>
        { console.log (traits) }
        { traits.map(trait => trait.traitvalue).join(' - ') }

        { this.DragonImage }
      </div>
    )
  }
}

export default DragonAvatar;