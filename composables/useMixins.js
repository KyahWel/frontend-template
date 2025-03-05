export const useMixins = () => {
    
  const deepCopy = (object) => {
      return JSON.parse(JSON.stringify(object));
  };
  
  return { deepCopy };
};
