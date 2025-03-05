export default () => {
  function base64urlDecode(str) {
      const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
      const padding = base64.length % 4 === 2 ? '==' : base64.length % 4 === 1 ? '=' : '';
      const decoded = atob(base64 + padding);
      return decoded;
  }

  function decode(token) {
      const parts = token.split('.');
      const encodedPayload = parts[1];
      const decodedPayload = base64urlDecode(encodedPayload);
      const payload = JSON.parse(decodedPayload);
      return payload;
  }
  
  return {
      decode,
  };
};