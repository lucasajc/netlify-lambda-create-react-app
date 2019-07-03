import axios from 'axios';

exports.handler = async(event, context) => {
  const { characterId } = event.queryStringParameters;
  let response = {};

  try {
    const { status, data } = await axios({
      url: `https://swapi.co/api/people/${characterId}`,
      method: 'GET',
    });
    response = { character: data, success: status };
  } catch (error) {
    response.success = false;
    response.error = error;
    console.error(error);
  }
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };

}
