import { Request, Response } from "express";
import { prismaCilent } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createOccurrence = async (req: Request, res: Response) => {
    try {

        const { 
            reportId, 
            userId, 
        } = req.body;

        const user = await prismaCilent.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new NotFoundException(
                "Usuário não encontrado",
                ErrorCode.USER_NOT_FOUND
            );
        }

        const report = await prismaCilent.report.findUnique({
            where: { id: reportId },
        });

        if (!report) {
            throw new NotFoundException(
                "Denúncia não encontrada",
                ErrorCode.REPORT_NOT_FOUND
            );
        }

        const occurrence = await prismaCilent.occurrence.create({
            data: {
                ...req.body,
                reportId,
                userId,
            },
        });

        await prismaCilent.report.update({
            where: { id: reportId },
            data: {
                status: "CONVERTED_TO_OCCURRENCE",
            },
        });

        res.status(201).json(occurrence);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar a Ocorrência!!" });
    }
};

export const deleteOccurrence = async (req: Request, res: Response) => {
    try {
        const occurrenceId = +req.params.id;

        const occurrence = await prismaCilent.occurrence.findUnique({
            where: { id: occurrenceId },
        });

        if (!occurrence) {
            throw new NotFoundException(
                "Ocorrência não encontrada",
                ErrorCode.OCCURRENCE_NOT_FOUND
            );
        }
        
        await prismaCilent.report.update({
            where: { id: occurrence.reportId },
            data: { status: "PENDING" },
        });

        const deletedOccurrence = await prismaCilent.occurrence.delete({
            where: { id: occurrenceId },
        });

        res.status(200).json(deletedOccurrence);
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar a Ocorrência!" });
    }
};

export const updateOccurrence = async (req: Request, res: Response) => {
    const { id, description, status, userId, reportId, title } = req.body;

    try {
        const existingOccurrence = await prismaCilent.occurrence.findUnique({
            where: { id: id },
        });

        if (!existingOccurrence) {
            throw new NotFoundException(
                "Ocorrência não encontrada",
                ErrorCode.OCCURRENCE_NOT_FOUND
            );
        }

        const user = await prismaCilent.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException(
                "Usuário não encontrado",
                ErrorCode.USER_NOT_FOUND
            );
        }

        const report = await prismaCilent.report.findUnique({
            where: { id: reportId },
        });

        if (!report) {
            throw new NotFoundException(
                "Denúncia não encontrada",
                ErrorCode.REPORT_NOT_FOUND
            );
        }

        await prismaCilent.report.update({
            where: { id: existingOccurrence.reportId },
            data: {
                status: "PENDING",
            },
        });

        await prismaCilent.report.update({
            where: { id: reportId },
            data: {
                status: "CONVERTED_TO_OCCURRENCE",
            },
        });

        const updatedOccurrence = await prismaCilent.occurrence.update({
            where: { id: id },
            data: {
                description,
                status,
                userId,
                reportId,
                title
            },
        });

        res.status(200).json(updatedOccurrence);
    } catch (error) {
        res.status(500).json({ message: "Erro interno no servidor" });
    }
};

export const findAllOccurrence = async (req: Request, res: Response) => {
    const { description, status, reportId, userId, title  } = req.query;

    const filters: any = {};

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

    if (reportId) {
        filters.reportId = {
            equals: Number(reportId),
        };
    }

    if (userId) {
        filters.userId = {
            equals: Number(userId),
        };
    }

    if(title){
        filters.title = {
            contains: String(title),
        };
    }

    const count = await prismaCilent.occurrence.count({
        where: filters
    });

    const occurrences = await prismaCilent.occurrence.findMany({
        where: filters,
        select: {
            id: true,
            description: true,
			status: true,
			createdAt: true,
			updatedAt: true,
            title: true,
            report: true,
            user: true,
        }
    });

    res.json({
        count, 
        occurrences
    });
}

export const findAllOccurrencePublic = async (req: Request, res: Response) => {
    const { description, status, title } = req.query;

    console.log(req.query);

    const filters: any = {};

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

    if (title) {
        filters.title = {
            contains: String(title),
        };
    }

    const count = await prismaCilent.occurrence.count({
        where: filters,
    });

    const occurrences = await prismaCilent.occurrence.findMany({
        where: filters,
        select: {
			description: true,
			status: true,
			createdAt: true,
			updatedAt: true,
            title: true
        },
    });

    res.json({
        count, 
        occurrences
    });
}