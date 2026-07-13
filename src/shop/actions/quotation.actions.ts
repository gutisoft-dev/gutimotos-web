import { gutiMotors } from "@/api/GutiMotosAPI";
import type {
  DetailsQuotation,
  QuotationResponse,
} from "../interfaces/Quotation.response";
import axios from "axios";

interface Quotation {
  items: QuotationItem[];
  type_price_slug: string;
  currency_code: string;
  whatsapp: string;
}
interface QuotationItem {
  product_code: string;
  quantity: number;
}

export const createQuotation = async (quotation: Quotation) => {
  try {
    const resp = await gutiMotors.post(
      "/quotations/api/quotation/create/",
      quotation,
    );
    return {
      success: true,
      message: resp.data.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.details ?? "Error al crear la cotización",
      };
    }

    return {
      success: false,
      message: "Error inesperado",
    };
  }
};

export const getQuotations = async (): Promise<QuotationResponse> => {
  const { data } = await gutiMotors.get<QuotationResponse>(
    "/quotations/api/quotation/",
  );
  return data;
};

export const getDetailsQuotation = async (
  id: string,
): Promise<DetailsQuotation> => {
  const { data } = await gutiMotors.get<QuotationResponse>(
    `/quotations/api/quotation/${id}/items/?page=1 `,
  );
  return data;
};

interface Items {
  items: { product_code: string; quantity: number }[];
  id: string;
}

export const updateQuotation = async ({ id, items }: Items) => {
  try {
    const resp = await gutiMotors.put(
      `/quotations/api/quotation/update-items/${id}/`,
      { items },
    );
    return {
      success: true,
      message: resp.data.message,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.details ?? "Error al actualizar la cotización",
      };
    }

    return {
      success: false,
      message: "Error inesperado",
    };
  }
};

interface Status {
  id: string;
  text: string;
}
export const actionsQuotation = async ({ id, text }: Status) => {
  try {
    const resp = await gutiMotors.patch(
      `/quotations/api/quotation/patch-status/${id}/`,
      {
        status: text,
      },
    );
    console.log(resp);
    return {
      success: true,
      message: "Cotización actualizada",
    };
  } catch (error) {
    console.log(error);

    if (axios.isAxiosError(error)) {
      return {
      success: false,
      message:
        error.response?.data?.details || "Error al actualizar la cotización",
    };
    }

    return {
      success: false,
      message: "Error inesperado",
    };
  }
};
