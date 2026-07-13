import { formatDate } from "@/lib/formatting";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";

interface Quotation {
  id: string;
  status: string;
  status_label: string;
  currency_code: string;
  total: string;
  created: string;
  expired: string;
  // items?: QuotationItem[];
}

interface QuotationsViewProps {
  quotations: Quotation[];
}
export const QuotationsView = ({ quotations }: QuotationsViewProps) => {
  const navigate = useNavigate();
  // console.log(quotations);

  return (
    <div className="w-full min-h-screen ">
      <div className=" mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2"></div>
          <p className="text-muted-foreground">
            Total de cotizaciones:{" "}
            <span className="font-semibold">{quotations.length}</span>
          </p>
        </div>

        <div className="space-y-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {quotations.map((quotation) => (
            <Card className="group rounded-md border shadow-none transition-all duration-300 hover:shadow-md h-full">
              <CardContent className="p-0 h-full flex flex-col justify-between">
                {/* Header */}
                <div className="p-4 border-b bg-slate-50 rounded-t-md">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        quotation.status === "CREATED"
                          ? "bg-green-100 text-green-700"
                          : quotation.status === "CONFIRMED"
                            ? "bg-green-100 text-green-700"
                            : quotation.status === "EXPIRED" ||
                                quotation.status === "CANCELLED"
                              ? "bg-red-100 text-red-700"
                              : quotation.status === "REVISED" &&
                                "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {quotation.status_label}
                    </span>

                    {/* <span className="text-xs text-slate-500">
                      {quotation.status_label}
                    </span> */}
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-4 flex-1">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground">
                      Cotización
                    </p>

                    <h3 className="font-semibold text-base tracking-tight">
                      #{quotation.id.substring(0, 8)}
                    </h3>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-muted-foreground">
                      Total
                    </p>

                    <p className="text-2xl font-semibold ">
                      {quotation.currency_code} {quotation.total}
                    </p>

                    {/* <p className="text-xs text-muted-foreground">
                      {quotation.currency_code}
                    </p> */}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />

                    <span>{formatDate(quotation.created)}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t text-center">
                  <Button
                    className="w-full cursor-pointer"
                    size="sm"
                    variant={
                      quotation.status === "CREATED" ? "outline" : "secondary"
                    }
                    disabled={
                      quotation.status === "CANCELLED" ||
                      quotation.status === "EXPIRED"
                    }
                    onClick={() => {
                      navigate(`/quotes/details?id=${quotation.id}`);
                    }}
                  >
                    {quotation ? "Ver detalles" : "Cotización deshabilitada"}
                  </Button>
                  {quotation.status === "CREATED" && (
                    <em className="text-xs text-muted-foreground ">
                      Esta cotización esta en proceso de revisión
                    </em>
                  )}
                  {quotation.status === "REVISED" && (
                    <em className="text-xs text-muted-foreground">
                      Hay acciones que debes realizar en la cotización Click para entrar
                    </em>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* {expandedId === quotation.id && (
           <DetailsQuotationView quotationId={quotation.id} />
          )} */}
        {/* Empty State */}
        {quotations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">
              No hay cotizaciones disponibles
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
