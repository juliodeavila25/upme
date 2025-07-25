const axios = require("axios");
const fs = require("fs");
const db = require("../models");
const Project = db.Project;

const { logWithIpAndLocation } = require("../config/utils/logger");

exports.syncAllData = async (req, res) => {
  try {
    const url =
      "https://geo.upme.gov.co/server/rest/services/Fuentes_Externas/Proyectos_Generacion_XM/FeatureServer/0/query";
    const params = {
      where: "1=1",
      outFields: "*",
      f: "json",
      outSR: 4326,
    };

    const response = await axios.get(url, { params });

    const data = response.data;

    if (data.error) {
      return res
        .status(500)
        .send({ message: "Error en la respuesta de UPME", error: data.error });
    }

    const features = data.features || [];

    const records = features.map((f) => ({
      id_umpe: f.attributes.id,
      start_year: f.attributes.anio_fpo,
      sic_code: f.attributes.codigo_sic,
      resource_name: f.attributes.nombre_recurso,
      net_effective_capacity_mw: f.attributes.capacidad_efectiva_neta_mw,
      conversion_factor: f.attributes.factor_conversion,
      is_small: f.attributes.es_menor,
      dispatch_type: f.attributes.tipo_despacho,
      default_fuel: f.attributes.combustible_defecto,
      operation_date: f.attributes.fecha_operacion,
      representative_agent: f.attributes.agente_representante,
      resource_status: f.attributes.estado_recurso,
      generation_type: f.attributes.tipo_generacion,
      classification: f.attributes.clasificacion,
      date: f.attributes.fecha,
      official_municipality: f.attributes.municipio_oficial,
      municipality_code: f.attributes.cod_mpio,
      official_department: f.attributes.departamento_oficial,
      latitude: f.geometry?.y,
      longitude: f.geometry?.x,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await Project.destroy({ where: {}, truncate: true });

    await Project.bulkCreate(records, { ignoreDuplicates: true });

    res.status(200).json({
      message: "UPME data saved successfully",
      totalInserted: records.length,
      preview: records.slice(0, 5),
    });
  } catch (err) {
    await logWithIpAndLocation(
      req,
      `Error en getAllData: ${err.message}`,
      "error"
    );
    res.status(500).send({ message: err.message });
  }
};

exports.getAllData = async (req, res) => {
  try {
    const result = await Project.findAll({
      order: [["resource_name", "ASC"]],
    });

    res.json(result);
  } catch (err) {
    
    await logWithIpAndLocation(
      req,
      `Error fetching projects: ${err.message}`,
      "error"
    );

    res.status(500).send({ message: err.message });
  }
};
