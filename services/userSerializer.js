function serializeUserProfile(user) {
  return {
    id: user._id.toString(),
    nome: user.nome,
    email: user.email,
    cargo: user.cargo || null,
    criadoEm: user.criadoEm,
  };
}

module.exports = {
  serializeUserProfile,
};

