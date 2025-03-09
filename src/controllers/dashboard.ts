import { Request, Response } from "express";
import { prismaCilent } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const getDashboardData = async (req: Request, res: Response) => {
    try {

        const pendingReports = await prismaCilent.report.count({
            where: { status: "PENDING" },
        });

        const underReviewReports = await prismaCilent.report.count({
            where: { status: "UNDER_REVIEW" },
        });

        const convertedToOccurrenceReports = await prismaCilent.report.count({
            where: { status: "CONVERTED_TO_OCCURRENCE" },
        });


        const openOccurrences = await prismaCilent.occurrence.count({
            where: { status: "OPEN" },
        });

        const inProgressOccurrences = await prismaCilent.occurrence.count({
            where: { status: "IN_PROGRESS" },
        });

        const closedOccurrences = await prismaCilent.occurrence.count({
            where: { status: "CLOSED" },
        });

        res.status(200).json({
            reportStatus: {
                pending: pendingReports,
                underReview: underReviewReports,
                convertedToOccurrence: convertedToOccurrenceReports,
            },
            occurrenceStatus: {
                open: openOccurrences,
                inProgress: inProgressOccurrences,
                closed: closedOccurrences,
            },
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar os dados do dashboard" });
    }
};
