export interface QuotationResponse {
    data: Data;
}

export interface Data {
    results:      Result[];
    total_count:  number;
    total_pages:  number;
    current_page: number;
    has_next:     boolean;
    has_previous: boolean;
}

export interface Result {
    id:            string;
    status:        string;
    status_label:  string;
    currency_code: string;
    total:         string;
    created:       string;
    expired:       string;
}


export interface DetailsQuotation {
    data: Data;
}

export interface Data {
    quotation:    Quotation;
    items:        Item[];
    total_count:  number;
    total_pages:  number;
    current_page: number;
    has_next:     boolean;
    has_previous: boolean;
}

export interface Item {
    product_code:        string;
    product_description: string;
    quantity:            number;
    unit_price:          string;
    subtotal:            string;
    photo:               string;
}

export interface Quotation {
    id:            string;
    status:        string;
    status_label:  string;
    currency_code: string;
    expired:       string;
    subtotal:      string;
    total:         string;
}
