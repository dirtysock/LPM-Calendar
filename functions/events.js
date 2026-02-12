```js
exports.handler = async () => {
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ 
      working: true, 
      message: "FUNCTION LOADS!", 
      time: new Date().toISOString() 
    })
  };
};
