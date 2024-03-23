/**
 * Request method
 * @param  {String} url
 * @param  {String} method='GET'
 */
export const request = async (url: string, method = "GET") => {
  const response = await fetch(`https://api.github.com${url}`, {
    method,
  });

  if (!response.ok) {
    throw await response.json();
  }

  return await response.json();
};
