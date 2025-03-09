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

        res.json(deletedReport);
    } catch (error) {
        if (error instanceof NotFoundException) {
            res.status(404).json({ message: error.message, errorCode: error.errorCode });
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
        email 
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

        if(userId != null){
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
                email 
             },
        });

        res.json(updatedReport);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar a denúncia" });
    }
};

export const findAllReport = async (req: Request, res: Response) => {
    const { code, description, status } = req.query;

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
                countryReport: true
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
