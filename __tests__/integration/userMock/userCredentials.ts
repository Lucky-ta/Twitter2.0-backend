const userCredentials = {
  validCredentials: {
    name: 'Lucas',
    email: 'lucmaieski@gmail.com',
    password: '123456789',
  },

  credentialsWithoutPass: {
    name: 'Lucas',
    email: 'lucmaieski@gmail.com',
  },
  credentialsEmptyPass: {
    name: 'Lucas',
    email: 'lucmaieski@gmail.com',
    password: '',
  },
  credentialsInvalidPass: {
    email: 'lucmaieski@gmail.com',
    password: '123456',
  },

  credentialsWithoutemail: {
    name: 'Lucas',
    email: '',
    password: '123456789',
  },
  credentialsEmptyemail: {
    name: 'Lucas',
    password: '123456789',
  },
  credentialsInvalidEmail: {
    email: 'anotherEmail@gmail.com',
    password: '123456789',
  },

  credentialsWithoutname: {
    name: '',
    email: 'lucmaieski@gmail.com',
    password: '123456789',
  },
  credentialsEmptytname: {
    name: 'Lucas',
    password: '123456789',
  },
};

export default userCredentials;
