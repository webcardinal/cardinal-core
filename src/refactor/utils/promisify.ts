export function promisifyEvent(event): Promise<any> {
  return new Promise((resolve, reject) => {
    event.emit((error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  })
}
