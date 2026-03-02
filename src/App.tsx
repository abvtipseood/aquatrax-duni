import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ShieldCheck, Clock, Phone, MessageCircle, ChevronRight, ChevronLeft, Waves, Menu, X, Focus, Instagram, Video, ChevronDown } from 'lucide-react';

const translations = {
  bg: {
    nav: { fleet: 'ФЛОТ', location: 'ЛОКАЦИЯ', pricing: 'ЦЕНИ', book: 'РЕЗЕРВИРАЙ' },
    hero: {
      location: 'Дюни, Созопол',
      title1: 'ВЛАДЕТЕЛИ НА',
      title2: 'ВЪЛНИТЕ',
      subtitle1: 'Премиум джетове и ексклузивни водни коли под наем в спокойните води на ваканционно селище ',
      subtitleBold: 'Дюни',
      subtitle2: '.',
      explore: 'Разгледай флота',
      contact: 'Свържи се с нас',
      scroll: 'Скролни надолу'
    },
    fleet: {
      title: 'НАШИЯТ ФЛОТ',
      subtitle: 'Избери своята машина. Предлагаме най-новите модели за максимално удоволствие, сигурност и адреналин във водата.',
      gtx: {
        badge: 'ЛУКС & МОЩ',
        desc: 'Безкомпромисен лукс и впечатляваща мощност. Създаден за абсолютна стабилност и комфорт дори при високи скорости. Перфектен за тези, които искат да порят вълните със стил и увереност.',
        f1: 'Максимална стабилност',
        f2: 'Премиум комфорт за двама',
        f3: 'Внушителна мощност'
      },
      yamaha: {
        badge: 'АДРЕНАЛИН',
        desc: 'Лека, изключително маневрена и създадена за трикове. Тази машина ще вдигне адреналина ти на макс. Идеална за динамично каране, резки завои и чисто забавление във водата.',
        f1: 'Супер лека конструкция',
        f2: 'Идеална за трикове',
        f3: 'Експлозивно ускорение'
      },
      jetcar: {
        badge: 'ЕКСКЛУЗИВНО',
        desc: 'Уникално преживяване, което събира всички погледи. Агресивна визия на спортен автомобил, съчетана с управление на мощен джет. Несравним комфорт и перфектната възможност за уникални летни снимки.',
        f1: 'Визия на суперкола',
        f2: 'Двуместен комфорт',
        f3: 'Топ атракция за снимки'
      }
    },
    inflatables: {
      title: 'ГРУПОВО ЗАБАВЛЕНИЕ',
      subtitle: 'Сподели адреналина с приятели. Нашите надуваеми атракциони гарантират много смях и незабравими емоции във водата.',
      lounge: {
        badge: 'ДО 8 ЧОВЕКА',
        name: 'Lounge Twister',
        desc: 'Перфектен за големи компании. Насладете се на скоростта и вълните заедно, докато се въртите и скачате по водата.',
        f1: 'За големи групи',
        f2: 'Екстремно въртене',
        f3: 'Максимален фън'
      },
      slider: {
        badge: 'ДО 4 ЧОВЕКА',
        name: 'Slider',
        desc: 'Бърз и динамичен. Идеален за по-малки групи, които търсят силни усещания и бързо плъзгане по вълните.',
        f1: 'Висока скорост',
        f2: 'Резки завои',
        f3: 'Спортно усещане'
      },
      aqua: {
        badge: 'ДО 6 ЧОВЕКА',
        name: 'Aqua Twister',
        desc: 'Златната среда за групи до 6 човека. Комбинира скорост, въртене и много адреналин за всички на борда.',
        f1: 'Балансиран размер',
        f2: 'Динамично въртене',
        f3: 'За цялото семейство'
      }
    },
    location: {
      title1: 'ПЕРФЕКТНАТА ЛОКАЦИЯ.',
      title2: 'БЕЗКОМПРОМИСНА СИГУРНОСТ.',
      desc: 'Намираме се в ексклузивната акватория на ваканционно селище Дюни. Заливът предлага спокойна вода, предпазена от големи вълни – идеални условия както за първо каране, така и за опитни ентусиасти.',
      bayTitle: 'Заливът на Дюни',
      bayDesc: 'Кристално чисто море, организиран достъп и ексклузивна атмосфера далеч от претъпканите плажове. Перфектното място за твоето лятно приключение.',
      briefTitle: 'Професионален инструктаж',
      briefDesc: 'Безопасността е наш основен приоритет. Всяко каране започва с подробен инструктаж от опитен професионалист. Осигуряваме висококачествени спасителни жилетки за всеки клиент.',
      quote: '"Най-доброто място за каране на джет по южното Черноморие. Спокойна вода и страхотно обслужване!"'
    },
    drone: {
      badge: 'Допълнителна услуга',
      title1: 'УЛОВИ',
      title2: 'МОМЕНТА',
      desc: 'Нека твоето приключение остане завинаги. Предлагаме професионално',
      descBold: '4K заснемане с дрон DJI Air 3S',
      f1Title: 'Интелигентно проследяване',
      f1Desc: 'Системата ActiveTrack автоматично те следва от въздуха, улавяйки всяка маневра, докато ти просто се забавляваш.',
      f2Title: 'Готово за Instagram & TikTok',
      f2Desc: 'Получаваш динамично, професионално монтирано видео с перфектно качество, напълно готово за социалните мрежи.'
    },
    pricing: {
      title: 'ПАКЕТИ И ЦЕНИ',
      subtitle: 'Избери продължителността на своето приключение.',
      min10: '10 Минути',
      desc10: 'Бърз старт и солидна доза адреналин. Идеално за първо усещане на машината и кратка разходка в залива.',
      min15: '15 Минути',
      desc15: 'Оптималното време да свикнеш с управлението, да тестваш възможностите на джета и да се насладиш истински на скоростта.',
      min30: '30 Минути',
      desc30: 'Пълно приключение и свобода в залива. За тези, които не искат забавлението да свършва бързо.',
      jet: 'Джет',
      jetcar: 'Jet Car',
      book: 'Резервирай',
      popular: 'НАЙ-ПОПУЛЯРНО',
      groupFun: 'Групови забавления',
      groupDesc: 'Lounge Twister, Slider, Aqua Twister. Сподели емоцията с приятели!',
      perPerson: 'на човек'
    },
    contact: {
      title1: 'ГОТОВ ЛИ СИ ЗА',
      title2: 'ВОДАТА?',
      desc: 'Свържи се с нас сега, за да запазиш своя час. Местата са ограничени, особено през уикендите. Очакваме те на плажа в Дюни!',
      whatsapp: 'Пиши ни във WhatsApp',
      rights: 'Всички права запазени.'
    }
  },
  en: {
    nav: { fleet: 'FLEET', location: 'LOCATION', pricing: 'PRICING', book: 'BOOK NOW' },
    hero: {
      location: 'Duni, Sozopol',
      title1: 'RULERS OF THE',
      title2: 'WAVES',
      subtitle1: 'Premium jet skis and exclusive jet cars for rent in the calm waters of the ',
      subtitleBold: 'Duni',
      subtitle2: ' holiday village.',
      explore: 'Explore fleet',
      contact: 'Contact us',
      scroll: 'Scroll down'
    },
    fleet: {
      title: 'OUR FLEET',
      subtitle: 'Choose your machine. We offer the latest models for maximum pleasure, safety, and adrenaline on the water.',
      gtx: {
        badge: 'LUXURY & POWER',
        desc: 'Uncompromising luxury and impressive power. Built for absolute stability and comfort even at high speeds. Perfect for those who want to cut through the waves with style and confidence.',
        f1: 'Maximum stability',
        f2: 'Premium comfort for two',
        f3: 'Impressive power'
      },
      yamaha: {
        badge: 'ADRENALINE',
        desc: 'Lightweight, extremely maneuverable, and built for tricks. This machine will push your adrenaline to the max. Ideal for dynamic riding, sharp turns, and pure fun on the water.',
        f1: 'Super lightweight construction',
        f2: 'Ideal for tricks',
        f3: 'Explosive acceleration'
      },
      jetcar: {
        badge: 'EXCLUSIVE',
        desc: 'A unique experience that catches every eye. Aggressive sports car look combined with the handling of a powerful jet ski. Unmatched comfort and the perfect opportunity for unique summer photos.',
        f1: 'Supercar look',
        f2: 'Two-seater comfort',
        f3: 'Top photo attraction'
      }
    },
    inflatables: {
      title: 'GROUP FUN',
      subtitle: 'Share the adrenaline with friends. Our inflatable attractions guarantee lots of laughs and unforgettable emotions on the water.',
      lounge: {
        badge: 'UP TO 8 PEOPLE',
        name: 'Lounge Twister',
        desc: 'Perfect for large groups. Enjoy the speed and waves together while spinning and bouncing on the water.',
        f1: 'For large groups',
        f2: 'Extreme spinning',
        f3: 'Maximum fun'
      },
      slider: {
        badge: 'UP TO 4 PEOPLE',
        name: 'Slider',
        desc: 'Fast and dynamic. Ideal for smaller groups looking for thrills and fast sliding over the waves.',
        f1: 'High speed',
        f2: 'Sharp turns',
        f3: 'Sporty feel'
      },
      aqua: {
        badge: 'UP TO 6 PEOPLE',
        name: 'Aqua Twister',
        desc: 'The sweet spot for groups up to 6 people. Combines speed, spinning, and lots of adrenaline for everyone on board.',
        f1: 'Balanced size',
        f2: 'Dynamic spinning',
        f3: 'For the whole family'
      }
    },
    location: {
      title1: 'THE PERFECT LOCATION.',
      title2: 'UNCOMPROMISING SAFETY.',
      desc: 'We are located in the exclusive waters of the Duni holiday village. The bay offers calm water, protected from large waves – ideal conditions for both first-time riders and experienced enthusiasts.',
      bayTitle: 'Duni Bay',
      bayDesc: 'Crystal clear sea, organized access, and an exclusive atmosphere away from crowded beaches. The perfect place for your summer adventure.',
      briefTitle: 'Professional briefing',
      briefDesc: 'Safety is our top priority. Every ride starts with a detailed briefing by an experienced professional. We provide high-quality life jackets for every customer.',
      quote: '"The best place to ride a jet ski on the southern Black Sea coast. Calm water and great service!"'
    },
    drone: {
      badge: 'Additional service',
      title1: 'CAPTURE',
      title2: 'THE MOMENT',
      desc: 'Let your adventure last forever. We offer professional',
      descBold: '4K drone recording with DJI Air 3S',
      f1Title: 'Intelligent tracking',
      f1Desc: 'The ActiveTrack system automatically follows you from the air, capturing every maneuver while you just have fun.',
      f2Title: 'Ready for Instagram & TikTok',
      f2Desc: 'You receive a dynamic, professionally edited video with perfect quality, fully ready for social media.'
    },
    pricing: {
      title: 'PACKAGES & PRICING',
      subtitle: 'Choose the duration of your adventure.',
      min10: '10 Minutes',
      desc10: 'Quick start and a solid dose of adrenaline. Ideal for a first feel of the machine and a short ride in the bay.',
      min15: '15 Minutes',
      desc15: 'The optimal time to get used to the handling, test the jet ski\'s capabilities, and truly enjoy the speed.',
      min30: '30 Minutes',
      desc30: 'Full adventure and freedom in the bay. For those who don\'t want the fun to end quickly.',
      jet: 'Jet Ski',
      jetcar: 'Jet Car',
      book: 'Book',
      popular: 'MOST POPULAR',
      groupFun: 'Group Fun',
      groupDesc: 'Lounge Twister, Slider, Aqua Twister. Share the emotion with friends!',
      perPerson: 'per person'
    },
    contact: {
      title1: 'ARE YOU READY FOR',
      title2: 'THE WATER?',
      desc: 'Contact us now to reserve your time. Spots are limited, especially on weekends. We are waiting for you at the beach in Duni!',
      rights: 'All rights reserved.'
    }
  },
  ru: {
    nav: { fleet: 'ФЛОТ', location: 'ЛОКАЦИЯ', pricing: 'ЦЕНЫ', book: 'БРОНЬ' },
    hero: {
      location: 'Дюни, Созополь',
      title1: 'ПОВЕЛИТЕЛИ',
      title2: 'ВОЛН',
      subtitle1: 'Премиальные гидроциклы и эксклюзивные водни машины под наем в спокойных водах курортного поселка ',
      subtitleBold: 'Дюни',
      subtitle2: '.',
      explore: 'Смотреть флот',
      contact: 'Связаться с нами',
      scroll: 'Прокрутить вниз'
    },
    fleet: {
      title: 'НАШ ФЛОТ',
      subtitle: 'Выбери свою машину. Мы предлагаем новейшие модели для максимального удовольствия, безопасности и адреналина на воде.',
      gtx: {
        badge: 'РОСКОШЬ И МОЩЬ',
        desc: 'Бескомпромиссная роскошь и впечатляющая мощность. Создан для абсолютной стабильности и комфорта даже на высоких скоростях. Идеально подходит для тех, кто хочет рассекать волны стильно и уверенно.',
        f1: '300 л.с.',
        f2: '3 места',
        f3: 'Bluetooth Аудио'
      },
      yamaha: {
        badge: 'ЛЕГКОСТЬ И ФАН',
        desc: 'Самый игривый и легкий гидроцикл в нашем флоте. Невероятно маневренный, идеально подходит для трюков и динамичного катания. Гарантированные улыбки и адреналин.',
        f1: '90 л.с.',
        f2: '2 места',
        f3: 'Легкий вес'
      },
      jetcar: {
        badge: 'ЭКСКЛЮЗИВ',
        desc: 'Почувствуй себя за рулем суперкара, но на воде! Уникальное сочетание дизайна спортивного автомобиля и адреналина гидроцикла. Будь в центре внимания.',
        f1: '130 л.с.',
        f2: '2 места',
        f3: 'Спорткар'
      }
    },
    inflatables: {
      title: 'ГРУППОВЫЕ РАЗВЛЕЧЕНИЯ',
      subtitle: 'Поделитесь адреналином с друзьями! Выберите один из наших экстремальных надувных аттракционов для незабываемых эмоций на воде.',
      lounge: {
        badge: 'РЕЛАКС И ФАН',
        name: 'Lounge Twister',
        desc: 'Идеальный баланс между комфортом и скоростью. Наслаждайтесь поездкой сидя, пока катер тянет вас по волнам.',
        f1: 'До 4 человек',
        f2: 'Сидя',
        f3: 'Умеренная'
      },
      slider: {
        badge: 'ЭКСТРИМ',
        name: 'Slider',
        desc: 'Держитесь крепче! Лежа на животе, вы почувствуете каждую волну и максимальную скорость прямо над водой.',
        f1: 'До 3 человек',
        f2: 'Лежа',
        f3: 'Высокая'
      },
      aqua: {
        badge: 'АДРЕНАЛИН',
        name: 'Aqua Twister',
        desc: 'Самый динамичный аттракцион! Вращения, прыжки и много брызг. Только для любителей сильных ощущений.',
        f1: 'До 6 человек',
        f2: 'Круг',
        f3: 'Экстремальная'
      }
    },
    location: {
      title1: 'ПЕРФЕКТНАЯ',
      title2: 'ЛОКАЦИЯ',
      desc: 'Расположенный в закрытом заливе курортного поселка Дюни, наш центр предлагает идеальные условия для катания на гидроциклах.',
      bayTitle: 'Спокойный залив',
      bayDesc: 'Защищенный от больших волн и сильных ветров, залив предоставляет гладкую воду, идеальную как для новичков, так и для опытных райдеров.',
      briefTitle: 'Професиональный инструктаж',
      briefDesc: 'Безопасность - наш главный приоритет. Каждое катание начинается с подробного инструктажа от опытного профессионала. Мы предоставляем высококачественные спасательные жилеты для каждого клиента.',
      quote: '"Лучшее место для катания на гидроциклах на южном побережье Черного моря. Спокойная вода и отличное обслуживание!"'
    },
    drone: {
      badge: 'Дополнительная услуга',
      title1: 'ЗАПЕЧАТЛЕЙ',
      title2: 'МОМЕНТ',
      desc: 'Пусть твое приключение останется навсегда. Мы предлагаем профессиональную',
      descBold: '4K съемку с дрона DJI Air 3S',
      f1Title: 'Интеллектуальное отслеживание',
      f1Desc: 'Система ActiveTrack автоматически следует за тобой с воздуха, снимая каждый маневр, пока ты просто веселишься.',
      f2Title: 'Готово для Instagram и TikTok',
      f2Desc: 'Ты получаешь динамичное, профессионально смонтированное видео идеального качества, полностью готовое для социальных сетей.'
    },
    pricing: {
      title: 'ПАКЕТЫ И ЦЕНЫ',
      subtitle: 'Выбери продолжительность своего приключения.',
      min10: '10 Минут',
      desc10: 'Быстрый старт и солидная доза адреналина. Идеално для первого знакомства с машиной и короткой прогулки по заливу.',
      min15: '15 Минут',
      desc15: 'Оптимальное время, чтобы привыкнуть к управлению, протестировать возможности гидроцикла и по-настоящему насладиться скоростью.',
      min30: '30 Минут',
      desc30: 'Полное приключение и свобода в заливе. Для тех, кто не хочет, чтобы веселье быстро заканчивалось.',
      jet: 'Гидроцикл',
      jetcar: 'Jet Car',
      book: 'Забронировать',
      popular: 'САМЫЙ ПОПУЛЯРНЫЙ',
      groupFun: 'Групповые развлечения',
      groupDesc: 'Lounge Twister, Slider, Aqua Twister. Поделитесь эмоциями с друзьями!',
      perPerson: 'с человека'
    },
    contact: {
      title1: 'ГОТОВ К',
      title2: 'ВОДЕ?',
      desc: 'Свяжись с нами сейчас, чтобы забронировать время. Места ограничены, особенно в выходные. Ждем тебя на пляже в Дюни!',
      rights: 'Все права защищены.'
    }
  },
  ro: {
    nav: { fleet: 'FLOTĂ', location: 'LOCAȚIE', pricing: 'PREȚURI', book: 'REZERVĂ' },
    hero: {
      location: 'Duni, Sozopol',
      title1: 'STĂPÂNII',
      title2: 'VALURILOR',
      subtitle1: 'Jet ski-uri premium și mașini de apă exclusive de închiriat în apele liniștite ale satului de vacanță ',
      subtitleBold: 'Duni',
      subtitle2: '.',
      explore: 'Explorează flota',
      contact: 'Contactează-ne',
      scroll: 'Derulează în jos'
    },
    fleet: {
      title: 'FLOTA NOASTRĂ',
      subtitle: 'Alege-ți mașina. Oferim cele mai noi modele pentru plăcere maximă, siguranță și adrenalină pe apă.',
      gtx: {
        badge: 'LUX ȘI PUTERE',
        desc: 'Lux fără compromisuri și putere impresionantă. Construit pentru stabilitate și confort absolut chiar și la viteze mari. Perfect pentru cei care doresc să taie valurile cu stil și încredere.',
        f1: '300 CP',
        f2: '3 locuri',
        f3: 'Audio Bluetooth'
      },
      yamaha: {
        badge: 'UȘOR ȘI DISTRACTIV',
        desc: 'Cel mai jucăuș și ușor jet ski din flota noastră. Incredibil de manevrabil, ideal pentru trucuri și o plimbare dinamică. Zâmbete și adrenalină garantate.',
        f1: '90 CP',
        f2: '2 locuri',
        f3: 'Greutate redusă'
      },
      jetcar: {
        badge: 'EXCLUSIV',
        desc: 'Simte-te ca la volanul unui supercar, dar pe apă! O combinație unică între designul unei mașini sport și adrenalina unui jet ski. Fii în centrul atenției.',
        f1: '130 CP',
        f2: '2 locuri',
        f3: 'Mașină sport'
      }
    },
    inflatables: {
      title: 'DISTRACȚIE ÎN GRUP',
      subtitle: 'Împărtășește adrenalina cu prietenii tăi! Alege una dintre atracțiile noastre gonflabile extreme pentru emoții de neuitat pe apă.',
      lounge: {
        badge: 'RELAXARE ȘI DISTRACȚIE',
        name: 'Lounge Twister',
        desc: 'Echilibrul perfect între confort și viteză. Bucură-te de plimbare stând jos în timp ce barca te trage peste valuri.',
        f1: 'Până la 4 persoane',
        f2: 'Așezat',
        f3: 'Moderată'
      },
      slider: {
        badge: 'EXTREM',
        name: 'Slider',
        desc: 'Ține-te bine! Întins pe burtă, vei simți fiecare val și viteza maximă chiar deasupra apei.',
        f1: 'Până la 3 persoane',
        f2: 'Întins',
        f3: 'Mare'
      },
      aqua: {
        badge: 'ADRENALINĂ',
        name: 'Aqua Twister',
        desc: 'Cea mai dinamică atracție! Rotiri, sărituri și multe stropi. Doar pentru iubitorii de senzații tari.',
        f1: 'Până la 6 persoane',
        f2: 'Cerc',
        f3: 'Extremă'
      }
    },
    location: {
      title1: 'LOCAȚIE',
      title2: 'PERFECTĂ',
      desc: 'Situat în golful închis al satului de vacanță Duni, centrul nostru oferă condițiile ideale pentru jet ski.',
      bayTitle: 'Golf liniștit',
      bayDesc: 'Protejat de valuri mari și vânturi puternice, golful oferă apă plată, ideală atât pentru începători, cât și pentru rideri experimentați.',
      briefTitle: 'Instructaj profesional',
      briefDesc: 'Siguranța este prioritatea noastră principală. Fiecare plimbare începe cu un instructaj detaliat din partea unui profesionist cu experiență. Oferim veste de salvare de înaltă calitate pentru fiecare client.',
      quote: '"Cel mai bun loc pentru jet ski pe coasta de sud a Mării Negre. Apă liniștită și servicii excelente!"'
    },
    drone: {
      badge: 'Serviciu suplimentar',
      title1: 'SURPRINDE',
      title2: 'MOMENTUL',
      desc: 'Lasă aventura ta să dureze pentru totdeauna. Oferim',
      descBold: 'înregistrare profesională cu drona 4K DJI Air 3S',
      f1Title: 'Urmărire inteligentă',
      f1Desc: 'Sistemul ActiveTrack te urmărește automat din aer, surprinzând fiecare manevră în timp ce tu doar te distrezi.',
      f2Title: 'Gata pentru Instagram și TikTok',
      f2Desc: 'Primești un videoclip dinamic, editat profesional, cu o calitate perfectă, complet pregătit pentru rețelele sociale.'
    },
    pricing: {
      title: 'PACHETE ȘI PREȚURI',
      subtitle: 'Alege durata aventurii tale.',
      min10: '10 Minute',
      desc10: 'Start rapid și o doză solidă de adrenalină. Ideal pentru o primă senzație a mașinii și o scurtă plimbare în golf.',
      min15: '15 Minute',
      desc15: 'Timpul optim pentru a te obișnui cu manevrarea, a testa capacitățile jet ski-ului și a te bucura cu adevărat de viteză.',
      min30: '30 Minute',
      desc30: 'Aventură completă și libertate în golf. Pentru cei care nu doresc ca distracția să se termine repede.',
      jet: 'Jet Ski',
      jetcar: 'Jet Car',
      book: 'Rezervă',
      popular: 'CEL MAI POPULAR',
      groupFun: 'Distracție în Grup',
      groupDesc: 'Lounge Twister, Slider, Aqua Twister. Împărtășește emoția cu prietenii!',
      perPerson: 'de persoană'
    },
    contact: {
      title1: 'EȘTI PREGĂTIT PENTRU',
      title2: 'APĂ?',
      desc: 'Contactează-ne acum pentru a-ți rezerva timpul. Locurile sunt limitate, mai ales în weekend. Te așteptăm pe plaja din Duni!',
      rights: 'Toate drepturile rezervate.'
    }
  }
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'bg' | 'en' | 'ru' | 'ro'>('bg');

  const fleetScrollRef = useRef<HTMLDivElement>(null);
  const inflatablesScrollRef = useRef<HTMLDivElement>(null);
  const pricingScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const { clientWidth } = ref.current;
      ref.current.scrollBy({ left: direction === 'left' ? -clientWidth : clientWidth, behavior: 'smooth' });
    }
  };

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.fleet, href: '#fleet' },
    { name: t.nav.location, href: '#location' },
    { name: t.nav.pricing, href: '#pricing' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500 selection:text-white scroll-smooth">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 z-50 group/logo">
            <div
              className="w-10 h-10 bg-cyan-400 group-hover:scale-110 transition-transform duration-300"
              style={{
                maskImage: 'url(/images/logo.png)',
                WebkitMaskImage: 'url(/images/logo.png)',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center'
              }}
            ></div>
            <span className="text-2xl font-bold tracking-wider uppercase whitespace-nowrap animate-glint">Aquatrax Sports</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-slate-300">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-cyan-400 transition-colors">
                {link.name}
              </a>
            ))}

            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors py-2">
                <span className="uppercase font-bold">{lang}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute right-0 mt-2 w-20 bg-slate-900 border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                <button onClick={() => setLang('bg')} className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${lang === 'bg' ? 'text-cyan-400 font-bold' : 'text-slate-300 font-medium'}`}>
                  BG
                </button>
                <button onClick={() => setLang('en')} className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${lang === 'en' ? 'text-cyan-400 font-bold' : 'text-slate-300 font-medium'}`}>
                  EN
                </button>
                <button onClick={() => setLang('ru')} className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${lang === 'ru' ? 'text-cyan-400 font-bold' : 'text-slate-300 font-medium'}`}>
                  RU
                </button>
                <button onClick={() => setLang('ro')} className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${lang === 'ro' ? 'text-cyan-400 font-bold' : 'text-slate-300 font-medium'}`}>
                  RO
                </button>
              </div>
            </div>

            <a href="#contact" className="px-6 py-2.5 bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors rounded-full font-bold shadow-lg shadow-cyan-500/20">
              {t.nav.book}
            </a>
          </div>

          {/* Mobile Menu Toggle & Lang */}
          <div className="flex items-center gap-4 md:hidden z-50">
            <button
              onClick={() => {
                const nextLang = { bg: 'en', en: 'ru', ru: 'ro', ro: 'bg' }[lang] as 'bg' | 'en' | 'ru' | 'ro';
                setLang(nextLang);
              }}
              className="flex items-center justify-center w-8 h-8 text-sm font-bold text-slate-300 hover:text-white transition-colors uppercase"
            >
              {lang}
            </button>
            <button
              className="text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-40 transition-transform duration-300 ease-in-out flex flex-col items-center justify-center gap-8 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-bold tracking-widest hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 px-8 py-4 bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors rounded-full font-bold text-lg shadow-lg shadow-cyan-500/20"
          >
            {t.nav.book}
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/hero-bg.png"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-bold tracking-widest uppercase backdrop-blur-sm">
            {t.hero.location}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6 leading-[1.1]">
            {t.hero.title1} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">{t.hero.title2}</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 mb-10 font-light leading-relaxed max-w-2xl mx-auto">
            {t.hero.subtitle1}<strong className="text-white font-semibold">{t.hero.subtitleBold}</strong>{t.hero.subtitle2}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#fleet" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
              {t.hero.explore} <ChevronRight className="w-5 h-5" />
            </a>
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold rounded-full hover:bg-cyan-500/20 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
              <Phone className="w-5 h-5" /> {t.hero.contact}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 mx-auto w-fit animate-bounce flex flex-col items-center gap-2 text-slate-400 z-20">
          <span className="text-xs font-bold tracking-widest uppercase">{t.hero.scroll}</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-cyan-500 to-transparent rounded-full"></div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="py-12 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{t.fleet.title}</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg">
            {t.fleet.subtitle}
          </p>
        </div>

        <div className="relative group">
          <div
            ref={fleetScrollRef}
            className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 md:pb-0 px-4 md:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* Product 1: Sea-Doo GTX */}
            <div className="w-[75vw] md:w-auto min-w-[280px] md:min-w-0 snap-center shrink-0 group bg-slate-900/50 border border-white/5 rounded-[2rem] overflow-hidden hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col">
              <div className="aspect-square md:aspect-[4/3] overflow-hidden relative bg-slate-800 flex items-center justify-center">
                {/* IMAGE 1: Sea-Doo GTX */}
                <img
                  src="https://i.ibb.co/5xxcKFt9/viber-2026-02-27-18-25-58-975.jpg"
                  alt="Sea-Doo GTX"
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-50"></div>
                <div className="absolute top-6 right-6 bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-cyan-400 border border-cyan-500/20 tracking-wider">
                  {t.fleet.gtx.badge}
                </div>
              </div>
              <div className="p-6 md:p-8 flex-grow flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Sea-Doo GTX</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 md:mb-8 flex-grow">
                  {t.fleet.gtx.desc}
                </p>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-slate-300 font-medium bg-slate-950/50 p-4 md:p-5 rounded-2xl border border-white/5">
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div> {t.fleet.gtx.f1}</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div> {t.fleet.gtx.f2}</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div> {t.fleet.gtx.f3}</li>
                </ul>
              </div>
            </div>

            {/* Product 2: Sea-Doo Spark Trixx */}
            <div className="w-[75vw] md:w-auto min-w-[280px] md:min-w-0 snap-center shrink-0 group bg-slate-900/50 border border-white/5 rounded-[2rem] overflow-hidden hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 flex flex-col">
              <div className="aspect-square md:aspect-[4/3] overflow-hidden relative bg-slate-800 flex items-center justify-center">
                {/* IMAGE 2: Yamaha FX Cruiser */}
                <img
                  src="https://i.ibb.co/YFv31rLs/viber-2026-02-27-18-25-59-290.jpg"
                  alt="Yamaha FX Cruiser"
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-50"></div>
                <div className="absolute top-6 right-6 bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-orange-400 border border-orange-500/20 tracking-wider">
                  {t.fleet.yamaha.badge}
                </div>
              </div>
              <div className="p-6 md:p-8 flex-grow flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Yamaha FX Cruiser</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 md:mb-8 flex-grow">
                  {t.fleet.yamaha.desc}
                </p>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-slate-300 font-medium bg-slate-950/50 p-4 md:p-5 rounded-2xl border border-white/5">
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div> {t.fleet.yamaha.f1}</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div> {t.fleet.yamaha.f2}</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div> {t.fleet.yamaha.f3}</li>
                </ul>
              </div>
            </div>

            {/* Product 3: Jet Car */}
            <div className="w-[75vw] md:w-auto min-w-[280px] md:min-w-0 snap-center shrink-0 group bg-slate-900/50 border border-white/5 rounded-[2rem] overflow-hidden hover:border-yellow-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10 flex flex-col">
              <div className="aspect-square md:aspect-[4/3] overflow-hidden relative bg-slate-800 flex items-center justify-center">
                {/* IMAGE 3: Jet Car */}
                <img
                  src="https://i.ibb.co/WWnB4bC4/viber-2026-02-27-18-28-50-861.jpg"
                  alt="Jet Car"
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-50"></div>
                <div className="absolute top-6 right-6 bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-yellow-400 border border-yellow-500/20 tracking-wider">
                  {t.fleet.jetcar.badge}
                </div>
              </div>
              <div className="p-6 md:p-8 flex-grow flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Aquatrax Jet Car</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 md:mb-8 flex-grow">
                  {t.fleet.jetcar.desc}
                </p>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-slate-300 font-medium bg-slate-950/50 p-4 md:p-5 rounded-2xl border border-white/5">
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]"></div> {t.fleet.jetcar.f1}</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]"></div> {t.fleet.jetcar.f2}</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]"></div> {t.fleet.jetcar.f3}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile Arrows */}
          <button
            onClick={() => scroll(fleetScrollRef, 'left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800/90 border border-white/10 flex items-center justify-center text-white hover:bg-slate-700 transition-colors z-10 md:hidden shadow-lg backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll(fleetScrollRef, 'right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800/90 border border-white/10 flex items-center justify-center text-white hover:bg-slate-700 transition-colors z-10 md:hidden shadow-lg backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Inflatables Section */}
      <section id="inflatables" className="py-12 md:py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{t.inflatables.title}</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg">
            {t.inflatables.subtitle}
          </p>
        </div>

        <div className="relative group">
          <div
            ref={inflatablesScrollRef}
            className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 md:pb-0 px-4 md:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* Product 1: Lounge Twister */}
            <div className="w-[75vw] md:w-auto min-w-[280px] md:min-w-0 snap-center shrink-0 group bg-slate-900/50 border border-white/5 rounded-[2rem] overflow-hidden hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col">
              <div className="aspect-square md:aspect-[4/3] overflow-hidden relative bg-slate-800 flex items-center justify-center">
                <img
                  src="https://i.ibb.co/BVgsvGDr/image00003-1.jpg"
                  alt="Lounge Twister"
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-50"></div>
                <div className="absolute top-6 right-6 bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-cyan-400 border border-cyan-500/20 tracking-wider">
                  {t.inflatables.lounge.badge}
                </div>
              </div>
              <div className="p-6 md:p-8 flex-grow flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{t.inflatables.lounge.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 md:mb-8 flex-grow">
                  {t.inflatables.lounge.desc}
                </p>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-slate-300 font-medium bg-slate-950/50 p-4 md:p-5 rounded-2xl border border-white/5">
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div> {t.inflatables.lounge.f1}</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div> {t.inflatables.lounge.f2}</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div> {t.inflatables.lounge.f3}</li>
                </ul>
              </div>
            </div>

            {/* Product 2: Slider */}
            <div className="w-[75vw] md:w-auto min-w-[280px] md:min-w-0 snap-center shrink-0 group bg-slate-900/50 border border-white/5 rounded-[2rem] overflow-hidden hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 flex flex-col">
              <div className="aspect-square md:aspect-[4/3] overflow-hidden relative bg-slate-800 flex items-center justify-center">
                <img
                  src="https://i.ibb.co/ZpFv0fK6/image00002-1.jpg"
                  alt="Slider"
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-50"></div>
                <div className="absolute top-6 right-6 bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-orange-400 border border-orange-500/20 tracking-wider">
                  {t.inflatables.slider.badge}
                </div>
              </div>
              <div className="p-6 md:p-8 flex-grow flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{t.inflatables.slider.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 md:mb-8 flex-grow">
                  {t.inflatables.slider.desc}
                </p>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-slate-300 font-medium bg-slate-950/50 p-4 md:p-5 rounded-2xl border border-white/5">
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div> {t.inflatables.slider.f1}</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div> {t.inflatables.slider.f2}</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div> {t.inflatables.slider.f3}</li>
                </ul>
              </div>
            </div>

            {/* Product 3: Aqua Twister */}
            <div className="w-[75vw] md:w-auto min-w-[280px] md:min-w-0 snap-center shrink-0 group bg-slate-900/50 border border-white/5 rounded-[2rem] overflow-hidden hover:border-yellow-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10 flex flex-col">
              <div className="aspect-square md:aspect-[4/3] overflow-hidden relative bg-slate-800 flex items-center justify-center">
                <img
                  src="https://i.ibb.co/1f5S462Y/image00001-4.jpg"
                  alt="Aqua Twister"
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-50"></div>
                <div className="absolute top-6 right-6 bg-slate-950/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-yellow-400 border border-yellow-500/20 tracking-wider">
                  {t.inflatables.aqua.badge}
                </div>
              </div>
              <div className="p-6 md:p-8 flex-grow flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{t.inflatables.aqua.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 md:mb-8 flex-grow">
                  {t.inflatables.aqua.desc}
                </p>
                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-slate-300 font-medium bg-slate-950/50 p-4 md:p-5 rounded-2xl border border-white/5">
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]"></div> {t.inflatables.aqua.f1}</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]"></div> {t.inflatables.aqua.f2}</li>
                  <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]"></div> {t.inflatables.aqua.f3}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile Arrows */}
          <button
            onClick={() => scroll(inflatablesScrollRef, 'left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800/90 border border-white/10 flex items-center justify-center text-white hover:bg-slate-700 transition-colors z-10 md:hidden shadow-lg backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll(inflatablesScrollRef, 'right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800/90 border border-white/10 flex items-center justify-center text-white hover:bg-slate-700 transition-colors z-10 md:hidden shadow-lg backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Location & Safety */}
      <section id="location" className="py-16 md:py-24 bg-slate-900/30 border-y border-white/5 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">{t.location.title1} <br /><span className="text-cyan-400">{t.location.title2}</span></h2>
              <p className="text-slate-400 text-base md:text-lg mb-8 md:mb-12 leading-relaxed">
                {t.location.desc}
              </p>

              <div className="space-y-6 md:space-y-8">
                <div className="flex gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                    <MapPin className="w-6 h-6 md:w-7 md:h-7 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{t.location.bayTitle}</h4>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{t.location.bayDesc}</p>
                  </div>
                </div>

                <div className="flex gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                    <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{t.location.briefTitle}</h4>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{t.location.briefDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative group">
                <img
                  src="https://i.ibb.co/dsFLjyrC/BIG-7-1651666663328.jpg"
                  alt="Duni Bay"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                  <div className="bg-slate-950/60 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-white/10">
                    <p className="text-white font-medium text-sm md:text-lg italic leading-snug md:leading-normal">{t.location.quote}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drone Recording Section */}
      <section id="drone" className="py-12 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-[3rem] overflow-hidden relative shadow-2xl">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="p-10 lg:p-16 relative z-10">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-bold tracking-widest uppercase backdrop-blur-sm">
                {t.drone.badge}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">{t.drone.title1} <span className="text-cyan-400">{t.drone.title2}</span></h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                {t.drone.desc} <strong className="text-white">{t.drone.descBold}</strong>.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center shrink-0 border border-white/5">
                    <Focus className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{t.drone.f1Title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{t.drone.f1Desc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center shrink-0 border border-white/5">
                    <Instagram className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">{t.drone.f2Title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{t.drone.f2Desc}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-full min-h-[350px] lg:min-h-full">
              <video
                src="https://i.imgur.com/fjLzg6g.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:bg-gradient-to-r lg:from-slate-950 lg:via-slate-950/40 lg:to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">{t.pricing.title}</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="relative group max-w-5xl mx-auto">
          <div
            ref={pricingScrollRef}
            className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pt-6 pb-4 md:pt-12 md:pb-0 px-4 md:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* 10 Min */}
            <div className="w-[75vw] md:w-auto min-w-[280px] md:min-w-0 snap-center shrink-0 bg-slate-900/50 border border-white/5 rounded-[2rem] p-8 hover:border-cyan-500/30 transition-all duration-300 flex flex-col hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-white/5">
                  <Clock className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold">{t.pricing.min10}</h3>
              </div>
              <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
                {t.pricing.desc10}
              </p>
              <div className="mb-8 flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">{t.pricing.jet}</span>
                  <span className="text-2xl font-bold text-white">40 €</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">{t.pricing.jetcar}</span>
                  <span className="text-2xl font-bold text-yellow-500">65 €</span>
                </div>
              </div>
              <a href="#contact" className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-center transition-colors border border-white/10">
                {t.pricing.book}
              </a>
            </div>

            {/* 15 Min */}
            <div className="w-[75vw] md:w-auto min-w-[280px] md:min-w-0 snap-center shrink-0 bg-gradient-to-b from-cyan-900/30 to-slate-900/80 border border-cyan-500/40 rounded-[2rem] p-8 relative transform md:-translate-y-4 shadow-2xl shadow-cyan-900/20 flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-slate-950 text-xs font-bold px-5 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-cyan-500/30">
                {t.pricing.popular}
              </div>
              <div className="flex items-center gap-3 mb-6 mt-2">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                  <Clock className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold">{t.pricing.min15}</h3>
              </div>
              <p className="text-slate-300 text-sm mb-8 flex-grow leading-relaxed">
                {t.pricing.desc15}
              </p>
              <div className="mb-8 flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-cyan-500/20 pb-3">
                  <span className="text-sm font-medium text-cyan-100/70 uppercase tracking-wider">{t.pricing.jet}</span>
                  <span className="text-2xl font-bold text-white">60 €</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-sm font-medium text-cyan-100/70 uppercase tracking-wider">{t.pricing.jetcar}</span>
                  <span className="text-2xl font-bold text-yellow-400">85 €</span>
                </div>
              </div>
              <a href="#contact" className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-center transition-colors shadow-lg shadow-cyan-500/25">
                {t.pricing.book}
              </a>
            </div>

            {/* 30 Min */}
            <div className="w-[75vw] md:w-auto min-w-[280px] md:min-w-0 snap-center shrink-0 bg-slate-900/50 border border-white/5 rounded-[2rem] p-8 hover:border-cyan-500/30 transition-all duration-300 flex flex-col hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-white/5">
                  <Clock className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold">{t.pricing.min30}</h3>
              </div>
              <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
                {t.pricing.desc30}
              </p>
              <div className="mb-8 flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">{t.pricing.jet}</span>
                  <span className="text-2xl font-bold text-white">100 €</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">{t.pricing.jetcar}</span>
                  <span className="text-2xl font-bold text-yellow-500">150 €</span>
                </div>
              </div>
              <a href="#contact" className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-center transition-colors border border-white/10">
                {t.pricing.book}
              </a>
            </div>
          </div>

          {/* Mobile Arrows */}
          <button
            onClick={() => scroll(pricingScrollRef, 'left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800/90 border border-white/10 flex items-center justify-center text-white hover:bg-slate-700 transition-colors z-10 md:hidden shadow-lg backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll(pricingScrollRef, 'right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800/90 border border-white/10 flex items-center justify-center text-white hover:bg-slate-700 transition-colors z-10 md:hidden shadow-lg backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Group Fun Pricing */}
        <div className="mt-6 max-w-5xl mx-auto bg-slate-900/50 border border-white/5 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 hover:border-cyan-500/30 transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">{t.pricing.groupFun}</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                {t.pricing.groupDesc}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end shrink-0">
            <div className="text-4xl font-bold text-cyan-400 mb-1">15 €</div>
            <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">{t.pricing.perPerson}</div>
          </div>
        </div>
      </section>

      {/* Contact Section / Footer */}
      <section id="contact" className="bg-slate-950 border-t border-white/10 pt-24 pb-12 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">{t.contact.title1} <span className="text-cyan-400">{t.contact.title2}</span></h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
            {t.contact.desc}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
            <a href="tel:+359898506877" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all flex items-center justify-center gap-3 border border-white/10 hover:-translate-y-1">
              <Phone className="w-6 h-6" /> +359 89 8506877
            </a>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 bg-cyan-500"
                style={{
                  maskImage: 'url(/images/logo.png)',
                  WebkitMaskImage: 'url(/images/logo.png)',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center'
                }}
              ></div>
              <span className="font-bold text-slate-300 uppercase tracking-widest text-lg">Aquatrax Sports</span>
            </div>
            <div className="flex gap-6">
              <a href="https://www.facebook.com/aquatrax.sports/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Facebook</a>
              <a href="https://www.tiktok.com/@aquatraxwatersports" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">TikTok</a>
            </div>
            <p>© {new Date().getFullYear()} Aquatrax Duni. {t.contact.rights}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
