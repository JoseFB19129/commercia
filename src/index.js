const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo conectado");

    app.listen(3000, () => {
      console.log("Servidor corriendo en puerto 3000");
    });

  } catch (error) {
    console.log("Error conectando a Mongo:", error);
  }
};

startServer();