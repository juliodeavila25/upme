module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define("Project", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    }, // Unique identifier for the UMPE
    id_umpe: DataTypes.BIGINT, //ID
    start_year: DataTypes.INTEGER, //anio_fpo
    sic_code: DataTypes.STRING, //codigo_sic
    resource_name: DataTypes.STRING, //nombre_recurso
    net_effective_capacity_mw: DataTypes.FLOAT, //capacidad_neta_efectiva_mw
    conversion_factor: DataTypes.FLOAT, //factor_conversion
    is_small: DataTypes.STRING, //es_menor
    dispatch_type: DataTypes.STRING, //tipo_despacho
    default_fuel: DataTypes.STRING, //combustible_defecto
    operation_date: DataTypes.BIGINT, //fecha_operacion
    representative_agent: DataTypes.STRING, //agente_representante
    resource_status: DataTypes.STRING, //estado_recurso
    generation_type: DataTypes.STRING, //tipo_generacion
    classification: DataTypes.STRING, //clasificacion
    date: DataTypes.BIGINT,     //fecha
    official_municipality: DataTypes.STRING, //municipio_oficial
    municipality_code: DataTypes.STRING, //codigo_municipio
    official_department: DataTypes.STRING, //departamento_oficial
    latitude: DataTypes.DOUBLE, //latitud
    longitude: DataTypes.DOUBLE //longitud
  });

  return Project;
};
