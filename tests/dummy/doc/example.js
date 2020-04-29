(async () => {
  const request = {
    "data": [{
      "id": "11a905b1-785d-4917-a48b-79c4d6bfe24d",
      "type": "functions",
      "attributes": {
        "some-attribute": "here's a neat value!",
      }
    }],
    "meta": {
      "connection-parameters": {
        "url": "scheme://username:password@host:123/path/to/content.ext"
      }
    }
  };

  const body = JSON.stringify(request);

  const method = 'POST';

  await fetch('http://localhost:7000', { body, method });
});
