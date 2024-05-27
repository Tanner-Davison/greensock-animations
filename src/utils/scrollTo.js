export const scrollToElement = (target) => {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest' 
      });
    }
  };