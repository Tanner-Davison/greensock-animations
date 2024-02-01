import media from './media';

const text = {
  giant: `
  font-family: Archivo;
  font-style: normal;
  font-weight: 700;
  font-size: 6.944vw;
  line-height: 4.444vw; 

  ${media.fullWidth} {
    font-size: 100px;
    line-height: 64px; 
  }
  
  ${media.tablet} {
    font-size: 9.766vw;
    line-height: 6.25vw; 
  }
  
  ${media.mobile} {
    font-size: 11.215vw;
    line-height: 13.084vw; 
  }
  `,
  h1: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 700;

    ${media.fullWidth} {
      font-size: 60px;
      line-height: 64px;
    }

    ${media.desktop} {
      font-size: 4.167vw;
      line-height: 4.444vw;
    }

    ${media.tablet} {
      font-size: 5.859vw;
      line-height: 6.25vw;
    }

    ${media.mobile} {
      font-size: 11.215vw;
      line-height: 13.084vw;
    }
    `,
  h2: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 700;

    ${media.fullWidth} {
      font-size: 48px;
      line-height: 56px;
    }
    
    ${media.desktop} {
      font-size: 3.333vw;
      line-height: 3.889vw;
    }

    ${media.tablet} {
      font-size: 4.688vw;
      line-height: 5.469vw;
    }

    ${media.mobile} {
      font-size: 8.879vw;
      line-height: 9.813vw;
    }
    `,
  h3: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 700;

    ${media.fullWidth} {
      font-size: 34px;
      line-height: 40px;
    }
    
    ${media.desktop} {
      font-size: 2.361vw;
      line-height: 2.778vw;
    }

    ${media.tablet} {
      font-size: 3.32vw;
      line-height: 3.906vw;
    }

    ${media.mobile} {
      font-size: 7.009vw;
      line-height: 8.411vw;
    }
    `,
  h4: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 700;

    ${media.fullWidth} {
      font-size: 24px;
      line-height: 32px;
    }
    
    ${media.desktop} {
      font-size: 1.667vw;
      line-height: 2.222vw;
    }

    ${media.tablet} {
      font-size: 2.344vw;
      line-height: 3.125vw;
    }

    ${media.mobile} {
      font-size: 4.673vw;
      line-height: 5.607vw;
    }
  `,
  h5: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 700;

    ${media.fullWidth} {
      font-size: 20px;
      line-height: 24px;
    }
    
    ${media.desktop} {
      font-size: 1.389vw;
      line-height: 1.667vw;
    }

    ${media.tablet} {
      font-size: 1.953vw;
      line-height: 2.344vw;
    }

    ${media.mobile} {
      font-size: 4.673vw;
      line-height: 5.607vw;
    }
  `,
  h6: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 700;

${media.fullWidth} {
  font-size: 16px;
  line-height: 20px;
}

${media.desktop} {
  font-size: 1.111vw;
  line-height: 1.389vw;
}

${media.tablet} {
  font-size: 1.563vw;
  line-height: 1.953vw;
}

${media.mobile} {
  font-size: 3.738vw;
  line-height: 4.673vw;
}
`,
  m1: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 400;
  text-transform: uppercase;

    ${media.fullWidth} {
      font-size: 15px;
      line-height: 16px;
    }
    
    ${media.desktop} {
      font-size: 1.042vw;
      line-height: 1.111vw;
    }

    ${media.tablet} {
      font-size: 15px;
      line-height: 16px;
    }

    ${media.mobile} {
      font-size: 3.505vw;
      line-height: 3.738vw;
    }
    `,
  m2: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 500;
  text-transform: capitalize;

    ${media.fullWidth} {
      font-size: 18px;
      line-height: 20px;
    }
    
    ${media.desktop} {
      font-size: 1.25vw;
      line-height: 1.389vw;
    }

    ${media.tablet} {
      font-size: 1.758vw;
      line-height: 1.953vw;
    }

    ${media.mobile} {
      font-size: 4.206vw;
      line-height: 4.673vw;
    }
    `,
  m3: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 500;

    ${media.fullWidth} {
      font-size: 16px;
      line-height: 21px;
    }
    
    ${media.desktop} {
      font-size: 1.111vw;
      line-height: 1.458vw;
    }

    ${media.tablet} {
      font-size: 1.563vw;
      line-height: 2.051vw;
    }

    ${media.mobile} {
      font-size: 3.738vw;
      line-height: 4.907vw;
    }
    `,
  buttonL: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;

      ${media.fullWidth} {
        font-size: 16px;
        line-height: 17px;
      }

      ${media.desktop} {
        font-size: 1.111vw;
        line-height: 1.181vw;
      }

      ${media.tablet} {
        font-size: 1.563vw;
        line-height: 1.66vw;
      }
      
      ${media.mobile} {
        font-size: 3.738vw;
        line-height: 3.972vw;
      }
    `,
  bodyXXL: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 400;

    ${media.fullWidth} {
      font-size: 48px;
      line-height: 72px;
    }
    
    ${media.desktop} {
      font-size: 3.333vw;
      line-height: 5vw;
    }

    ${media.tablet} {
      font-size: 4.688vw;
      line-height: 7.031vw;
    }

    ${media.mobile} {
      font-size: 11.215vw;
      line-height: 16.822vw;
    }
  `,
  bodyXXLBold: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 700;

    ${media.fullWidth} {
      font-size: 48px;
      line-height: 72px;
    }
    
    ${media.desktop} {
      font-size: 3.333vw;
      line-height: 5vw;
    }

    ${media.tablet} {
      font-size: 4.688vw;
      line-height: 7.031vw;
    }

    ${media.mobile} {
      font-size: 11.215vw;
      line-height: 16.822vw;
    }
  `,
  bodyXL: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 400;

    ${media.fullWidth} {
      font-size: 34px;
      line-height: 51px;
    }
    
    ${media.desktop} {
      font-size: 2.361vw;
      line-height: 3.542vw;
    }

    ${media.tablet} {
      font-size: 3.32vw;
      line-height: 4.98vw;
    }

    ${media.mobile} {
      font-size: 7.944vw;
      line-height: 11.916vw;
    }
  `,
  bodyXLBold: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 700;

    ${media.fullWidth} {
      font-size: 34px;
      line-height: 51px;
    }
    
    ${media.desktop} {
      font-size: 2.361vw;
      line-height: 3.542vw;
    }

    ${media.tablet} {
      font-size: 3.32vw;
      line-height: 4.98vw;
    }

    ${media.mobile} {
      font-size: 7.944vw;
      line-height: 11.916vw;
    }
    `,
  bodyL: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 400;

    ${media.fullWidth} {
      font-size: 24px;
      line-height: 36px;
    }
    
    ${media.desktop} {
      font-size: 1.667vw;
      line-height: 2.5vw;
    }

    ${media.tablet} {
      font-size: 2.344vw;
      line-height: 3.516vw;
    }

    ${media.mobile} {
      font-size: 5.607vw;
      line-height: 8.411vw;
    }
    `,
  bodyLBold: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 700;

    ${media.fullWidth} {
      font-size: 24px;
      line-height: 36px;
    }
    
    ${media.desktop} {
      font-size: 1.667vw;
      line-height: 2.5vw;
    }

    ${media.tablet} {
      font-size: 2.344vw;
      line-height: 3.516vw;
    }

    ${media.mobile} {
      font-size: 5.607vw;
      line-height: 8.411vw;
    }
    `,
  bodyM: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 400;

    ${media.fullWidth} {
      font-size: 18px;
      line-height: 27px;
    }
    
    ${media.desktop} {
      font-size: 1.25vw;
      line-height: 1.875vw;
    }

    ${media.tablet} {
      font-size: 1.758vw;
      line-height: 2.637vw;
    }

    ${media.mobile} {
      font-size: 4.206vw;
      line-height: 6.308vw;
    }
    `,
  bodyMBold: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 700;

    ${media.fullWidth} {
      font-size: 18px;
      line-height: 27px;
    }
    
    ${media.desktop} {
      font-size: 1.25vw;
      line-height: 1.875vw;
    }

    ${media.tablet} {
      font-size: 1.758vw;
      line-height: 2.637vw;
    }

    ${media.mobile} {
      font-size: 4.206vw;
      line-height: 6.308vw;
    }
    `,
  bodyS: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 400;

    ${media.fullWidth} {
      font-size: 16px;
      line-height: 24px;
    }
    
    ${media.desktop} {
      font-size: 1.111vw;
      line-height: 1.667vw;
    }

    ${media.tablet} {
      font-size: 1.563vw;
      line-height: 2.344vw;
    }

    ${media.mobile} {
      font-size: 3.738vw;
      line-height: 5.607vw;
    }
    `,
  bodySBold: `
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 700;

    ${media.fullWidth} {
      font-size: 16px;
      line-height: 24px;
    }
    
    ${media.desktop} {
      font-size: 1.111vw;
      line-height: 1.667vw;
    }

    ${media.tablet} {
      font-size: 1.563vw;
      line-height: 2.344vw;
    }

    ${media.mobile} {
      font-size: 3.738vw;
      line-height: 5.607vw;
    }
    `,
    bodyXSBold: `
    font-family: Archivo;
    font-style: normal;
    font-weight: 700;

    ${media.fullWidth} {
      font-size: 14px;
      line-height: 18px;
    }
    
    ${media.tablet} {
      font-size: 1.367vw;
      line-height: 1.758vw;
    }
    
    ${media.mobile} {
      font-size: 3.271vw;
      line-height: 4.206vw;
    }
    `,
  eyebrow: `
  font-family: 'Archivo';
  font-style: normal;
  text-transform: uppercase;
  font-weight: 800;

      ${media.fullWidth} {
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 3px;
      }

      ${media.desktop} {
        font-size: 0.972vw;
        line-height: 1.25vw;
        letter-spacing: 0.208vw;
      }
      
      ${media.tablet} {
        font-size: 1.367vw;
        line-height: 1.758vw;
        letter-spacing: 0.293vw;
      }
      
      ${media.mobile} {
        font-size: 3.271vw;
        line-height: 4.206vw;
        letter-spacing: 0.701vw;
      }
    `,
  h1Mobile: `
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 700;
    font-size: 11.215vw;
    line-height: 13.084vw;
  `,
  h2Mobile: `
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 700;
    font-size: 8.879vw;
    line-height: 9.813vw;
  `,
  h3Mobile: `
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 700;
    font-size: 7.009vw;
    line-height: 8.411vw;
  `,
  h4Mobile: `
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 700;
    font-size: 4.673vw;
    line-height: 5.607vw;
  `,
  h5Mobile: `
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 700;
    font-size: 3.738vw;
    line-height: 4.673vw;
  `,
  transparentText: `
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  background-size: 100%;
  background-clip: text;
`,
  strokeText: `
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  background-size: 100%;
  background-clip: text;
  -webkit-text-stroke-width: 0.07vw;
`,
  strokeTextTransparent: `
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  background-size: 100%;
  background-clip: text;
  -webkit-text-stroke-width: 0.07vw;
`,
};
export default text;
