import { Request, Response } from "express";
import { prismaCilent } from "..";
import crypto from "crypto";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createReport = async (req: Request, res: Response) => {
  try {
    const reportCode = crypto.randomBytes(4).toString("hex").toUpperCase();

    const report = await prismaCilent.report.create({
      data: {
        ...req.body,
        code: reportCode,
      },
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar a denuncia!" });
  }
};

export const deleteReport = async (req: Request, res: Response) => {
  try {
    const reportId = +req.params.id;

    const report = await prismaCilent.report.findUnique({
      where: { id: reportId },
    });

    if (!report) {
      throw new NotFoundException(
        "Denúncia não encontrada",
        ErrorCode.REPORT_NOT_FOUND
      );
    }

    const occurrence = await prismaCilent.occurrence.findUnique({
      where: { reportId },
    });

    if (occurrence) {
      throw new NotFoundException(
        "A denúncia não pode ser deletada pois está vinculada a uma ocorrência",
        ErrorCode.REPORT_IN_OCCURRENCE
      );
    }

    const deletedReport = await prismaCilent.report.delete({
      where: { id: reportId },
    });

    res.status(204).json(deletedReport);
  } catch (error) {
    if (error instanceof NotFoundException) {
      res
        .status(404)
        .json({ message: error.message, errorCode: error.errorCode });
    } else {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
};

export const updateReport = async (req: Request, res: Response) => {
  const {
    reportId,
    description,
    addressReport,
    cityReport,
    UFReport,
    countryReport,
    status,
    reporterName,
    userId,
    CPF,
    telephone,
    address,
    email,
    titleReport,
  } = req.body;

  try {
    const existingReport = await prismaCilent.report.findUnique({
      where: { id: reportId },
    });

    if (!existingReport) {
      throw new NotFoundException(
        "Denúncia não encontrada",
        ErrorCode.REPORT_NOT_FOUND
      );
    }

    if (userId != null) {
      const user = await prismaCilent.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException(
          "Usuário não encontrado",
          ErrorCode.USER_NOT_FOUND
        );
      }
    }

    const updatedReport = await prismaCilent.report.update({
      where: { id: reportId },
      data: {
        description,
        addressReport,
        cityReport,
        UFReport,
        countryReport,
        status,
        reporterName,
        userId,
        CPF,
        telephone,
        address,
        email,
        titleReport,
      },
    });

    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar a denúncia" });
  }
};

export const findAllReportPublic = async (req: Request, res: Response) => {
  const {
    code,
    description,
    status,
    addressReport,
    cityReport,
    UFReport,
    countryReport,
  } = req.query;

  console.log(req.query);
  /*add titulo da denuncia*/
  const filters: any = {};

  if (code) {
    filters.code = {
      contains: String(code),
    };
  }

  if (description) {
    filters.description = {
      contains: String(description),
    };
  }

  if (status) {
    filters.status = {
      equals: String(status),
    };
  }

  if (addressReport) {
    filters.addressReport = {
      contains: String(addressReport),
    };
  }

  if (cityReport) {
    filters.cityReport = {
      contains: String(cityReport),
    };
  }

  if (UFReport) {
    filters.UFReport = {
      contains: String(UFReport),
    };
  }

  if (countryReport) {
    filters.countryReport = {
      contains: String(countryReport),
    };
  }

  try {
    const count = await prismaCilent.report.count({
      where: filters,
    });

    const reports = await prismaCilent.report.findMany({
      where: filters,
      select: {
        code: true,
        status: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        occurrence: true,
        addressReport: true,
        cityReport: true,
        UFReport: true,
        countryReport: true,
      },
    });

    res.json({
      count,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar denúncias." });
  }
};

export const findReport = async (req: Request, res: Response) => {
  const code = req.params.code;

  try {
    const report = await prismaCilent.report.findUnique({
      where: { code: String(code) },
      select: {
        code: true,
        status: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        occurrence: true,
        addressReport: true,
        cityReport: true,
        UFReport: true,
        countryReport: true,
        titleReport: true,
      },
    });

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar denúncia." });
  }
};

export const findAllReport = async (req: Request, res: Response) => {
  const {
    code,
    description,
    status,
    userId,
    reporterName,
    CPF,
    addressReport,
    cityReport,
    UFReport,
    countryReport,
  } = req.query;

  const filters: any = {};

  if (code) {
    filters.code = {
      contains: String(code),
    };
  }

  if (description) {
    filters.description = {
      contains: String(description),
    };
  }

  if (status) {
    filters.status = {
      equals: String(status),
    };
  }

  if (userId) {
    filters.userId = {
      equals: Number(userId),
    };
  }

  if (reporterName) {
    filters.reporterName = {
      contains: String(reporterName),
    };
  }

  if (CPF) {
    filters.CPF = {
      contains: String(CPF),
    };
  }

  if (addressReport) {
    filters.addressReport = {
      contains: String(addressReport),
    };
  }

  if (cityReport) {
    filters.cityReport = {
      contains: String(cityReport),
    };
  }

  if (UFReport) {
    filters.UFReport = {
      contains: String(UFReport),
    };
  }

  if (countryReport) {
    filters.countryReport = {
      contains: String(countryReport),
    };
  }

  try {
    const count = await prismaCilent.report.count({
      where: filters,
    });

    const reports = await prismaCilent.report.findMany({
      where: filters,
    });

    res.json({
      count,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar denúncias." });
  }
};

export const findAllReportSimple = async (req: Request, res: Response) => {
  try {
    const reports = await prismaCilent.report.findMany({
      where: {
        status: "PENDING",
      },
      select: {
        id: true,
        titleReport: true,
      },
    });

    res.json({
      data: reports,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar denúncias." });
  }
};


export const findAllReportSimpleComplet = async (req: Request, res: Response) => {
  try {
    const reports = await prismaCilent.report.findMany({
      select: {
        id: true,
        titleReport: true,
      },
    });

    console.log(reports)

    res.json({
      data: reports,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar denúncias." });
  }
};
