const clearDatabase = async (dataBase: any) => {
  await dataBase.destroy({
    where: {},
    truncate: true,
  });
};

export default clearDatabase;
