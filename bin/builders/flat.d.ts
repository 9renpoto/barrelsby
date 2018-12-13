import { BaseUrl } from "../options/baseUrl";
import { Logger } from "../options/logger";
import { QuoteCharacter } from "../options/quoteCharacter";
import { Directory, Location } from "../utilities";
export declare function buildFlatBarrel(directory: Directory, modules: Location[], quoteCharacter: QuoteCharacter, logger: Logger, baseUrl: BaseUrl): string;
