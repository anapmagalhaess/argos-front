import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
    faAlignLeft,
    faArrowPointer,
    faArrowRight,
    faArrowUpRightFromSquare,
    faBell,
    faBug,
    faCheck,
    faChartLine,
    faChevronDown,
    faCircleCheck,
    faCircleExclamation,
    faCircleMinus,
    faCircleQuestion,
    faCircleXmark,
    faCloud,
    faCloudRain,
    faCompass,
    faDroplet,
    faEnvelope,
    faHandPointer,
    faLeaf,
    faList,
    faMagnifyingGlass,
    faMinus,
    faMugHot,
    faPhone,
    faSeedling,
    faSkullCrossbones,
    faSnowflake,
    faStop,
    faSun,
    faTemperatureHalf,
    faTemperatureHigh,
    faTriangleExclamation,
    faVolumeHigh,
    faWater,
    faWheatAwn,
    faWind,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const ICONES = {
    "align-left": faAlignLeft,
    "arrow-pointer": faArrowPointer,
    "arrow-right": faArrowRight,
    "arrow-up-right": faArrowUpRightFromSquare,
    bell: faBell,
    bug: faBug,
    check: faCheck,
    "chart-line": faChartLine,
    "chevron-down": faChevronDown,
    "circle-check": faCircleCheck,
    "circle-exclamation": faCircleExclamation,
    "circle-minus": faCircleMinus,
    "circle-question": faCircleQuestion,
    "circle-xmark": faCircleXmark,
    cloud: faCloud,
    "cloud-rain": faCloudRain,
    compass: faCompass,
    droplet: faDroplet,
    envelope: faEnvelope,
    github: faGithub,
    "hand-pointer": faHandPointer,
    instagram: faInstagram,
    leaf: faLeaf,
    list: faList,
    "magnifying-glass": faMagnifyingGlass,
    minus: faMinus,
    "mug-hot": faMugHot,
    phone: faPhone,
    seedling: faSeedling,
    "skull-crossbones": faSkullCrossbones,
    snowflake: faSnowflake,
    stop: faStop,
    sun: faSun,
    "temperature-half": faTemperatureHalf,
    "temperature-high": faTemperatureHigh,
    "triangle-exclamation": faTriangleExclamation,
    "volume-high": faVolumeHigh,
    water: faWater,
    "wheat-awn": faWheatAwn,
    wind: faWind,
    xmark: faXmark,
    whatsapp: faWhatsapp,
} satisfies Record<string, IconDefinition>;

export type NomeIconeFA = keyof typeof ICONES;

interface IconeFAProps {
    nome: NomeIconeFA;
    className?: string;
    rotulo?: string;
}

/** Ícones de interface fornecidos pelo Font Awesome Free. */
export default function IconeFA({ nome, className, rotulo }: IconeFAProps) {
    return <FontAwesomeIcon icon={ICONES[nome]} className={className} aria-hidden={rotulo ? undefined : true} aria-label={rotulo} />;
}
