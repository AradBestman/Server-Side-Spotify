class SongsError extends Error {
  // Properties
  status: number;

  // Constructor
  constructor(message: string, status: number) {
    super(message);

    this.status = status;
  }
}

export { SongsError };
