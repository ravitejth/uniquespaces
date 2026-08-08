import { useEffect, useMemo, useState } from 'react'
import { heroSlides, navLinks, services, works } from './data'

// Vite rewrites asset URLs it can see at build time, but not ones built as
// runtime strings. Resolve those against the deploy base so they keep working
// when the site is served from a GitHub Pages subpath.
const BASE_URL = import.meta.env.BASE_URL
const asset = (path: string) => `${BASE_URL}${path.replace(/^\//, '')}`

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

function DotIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
    </svg>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [selectedWork, setSelectedWork] = useState<(typeof works)[number] | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [])

  const currentHero = useMemo(() => heroSlides[activeSlide], [activeSlide])

  return (
    <div className="min-h-screen bg-charcoal text-paper antialiased">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.14]"
        style={{ backgroundImage: `url('${asset('thin-lines.svg')}')` }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-paper/10 transition-all duration-500 ${
          scrolled ? 'bg-charcoal/95 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#home" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 text-xs tracking-[0.35em] text-ochre">
              US
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-sm tracking-[0.28em] text-paper">UNIQUE SPACES</span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.4em] text-paper/50">Architecture + Interiors</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.35em] text-paper/72 transition hover:text-ochre"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="home" className="overflow-x-hidden">
        <section className="relative min-h-screen pt-24">
          <div className="absolute inset-0 -z-10">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.image}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                  index === activeSlide ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ backgroundImage: `linear-gradient(rgba(61,57,53,0.34), rgba(61,57,53,0.72)), url('${slide.image}')` }}
              />
            ))}
            <div className="absolute inset-0 bg-charcoal/20" />
          </div>

          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `url('${asset('pattern-dots.svg')}')` }} />

          <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl grid-cols-12 items-end gap-6 px-5 pb-14 sm:px-8 lg:pb-20">
            <div className="col-span-12 max-w-3xl md:col-span-7 lg:col-span-6">
              <p className="mb-4 text-[11px] uppercase tracking-[0.45em] text-paper/70">
                Boutique architecture studio
              </p>
              <h1 className="max-w-3xl font-display text-5xl font-light uppercase leading-[0.9] text-ochre sm:text-7xl lg:text-[6rem]">
                Transform Your Space
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-7 text-paper/82 sm:text-base">
                {currentHero.caption} Minimal compositions, warm materiality, and spatial clarity for homes,
                hospitality, and workplaces.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#works"
                  className="inline-flex items-center gap-3 border border-paper/20 bg-paper/5 px-5 py-3 text-[11px] uppercase tracking-[0.35em] text-paper transition hover:border-ochre hover:text-ochre"
                >
                  Explore Works <ArrowIcon />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-2 py-3 text-[11px] uppercase tracking-[0.35em] text-paper/72 transition hover:text-paper"
                >
                  Start a project
                </a>
              </div>
            </div>

            <div className="col-span-12 flex items-end justify-between md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
              <div className="hidden h-40 w-px bg-paper/20 md:block" />
              <div className="ml-auto rounded-full border border-paper/15 bg-charcoal/40 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-paper/70">
                  <DotIcon />
                  Slide {String(activeSlide + 1).padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="border-t border-paper/10 bg-charcoal">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.45em] text-paper/55">Services</p>
                <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.12em] text-paper sm:text-4xl">
                  Designed to move from idea to built reality
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-paper/70">
                Each offering is presented as a clean architectural list, with subtle motion and a project image
                reveal on hover to echo the premium feel of the reference aesthetic.
              </p>
            </div>

            <div className="divide-y divide-paper/10 border-y border-paper/10">
              {services.map((service, index) => (
                <article
                  key={service.name}
                  className="group relative overflow-hidden px-0 py-6 transition hover:bg-paper/5 sm:py-7"
                >
                  <div
                    className="absolute inset-0 -z-10 bg-cover bg-center opacity-0 transition duration-700 group-hover:opacity-20"
                    style={{ backgroundImage: `linear-gradient(rgba(61,57,53,0.9), rgba(61,57,53,0.2)), url('${service.image}')` }}
                  />
                  <div className="grid gap-4 px-4 md:grid-cols-[1.6rem_1fr_18rem] md:items-center md:px-6">
                    <div className="text-ochre">
                      {index % 2 === 0 ? <ArrowIcon /> : <DotIcon />}
                    </div>
                    <div>
                      <h3 className="font-display text-lg uppercase tracking-[0.18em] text-paper sm:text-xl">
                        {service.name}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-7 text-paper/60">{service.description}</p>
                    </div>
                    <div className="justify-self-start text-[11px] uppercase tracking-[0.35em] text-paper/45 md:justify-self-end">
                      Hover to preview
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="works" className="border-t border-paper/10 bg-[#2f2b27]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.45em] text-paper/55">Selected Works</p>
                <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.12em] text-paper sm:text-4xl">
                  Calm, high-end spatial storytelling
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-paper/70">
                An asymmetrical gallery keeps the rhythm loose while preserving a premium editorial feel. Tap a
                project to open a minimal focus modal.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-12">
              {works.map((work, index) => (
                <button
                  key={work.title}
                  type="button"
                  onClick={() => setSelectedWork(work)}
                  className={`group relative overflow-hidden border border-paper/10 bg-charcoal text-left shadow-soft transition hover:-translate-y-1 hover:border-ochre/40 ${
                    index === 0 ? 'md:col-span-7 md:row-span-2 min-h-[28rem]' : index === 1 ? 'md:col-span-5 min-h-[18rem]' : index === 2 ? 'md:col-span-5 min-h-[18rem]' : 'md:col-span-7 min-h-[20rem]'
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `linear-gradient(rgba(61,57,53,0.18), rgba(61,57,53,0.8)), url('${work.image}')` }}
                  />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7">
                    <div className="mb-3 text-[10px] uppercase tracking-[0.4em] text-paper/65">{work.type}</div>
                    <h3 className="font-display text-2xl uppercase tracking-[0.14em] text-paper">{work.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-7 text-paper/72">{work.summary}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-paper/10 bg-charcoal">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl border border-paper/10 bg-paper/5 p-6">
                <p className="text-[11px] uppercase tracking-[0.45em] text-paper/55">Address</p>
                <p className="mt-4 max-w-md text-sm leading-7 text-paper/78">
                  Unique Spaces, 4th Floor, Studio House, 12/3 Museum Road, Bengaluru, Karnataka 560001
                </p>
                <div className="mt-8 flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.35em] text-paper/60">
                  <span>+91 98765 43210</span>
                  <span>hello@uniquespaces.in</span>
                </div>
              </div>
              <div className="rounded-2xl border border-paper/10 bg-paper/5 p-6">
                <p className="text-[11px] uppercase tracking-[0.45em] text-paper/55">Social</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <a className="inline-flex items-center gap-3 text-sm text-paper/78 transition hover:text-ochre" href={BASE_URL}>
                    <ArrowIcon /> Instagram
                  </a>
                  <a className="inline-flex items-center gap-3 text-sm text-paper/78 transition hover:text-ochre" href={BASE_URL}>
                    <ArrowIcon /> Pinterest
                  </a>
                  <a className="inline-flex items-center gap-3 text-sm text-paper/78 transition hover:text-ochre" href={BASE_URL}>
                    <ArrowIcon /> LinkedIn
                  </a>
                  <a className="inline-flex items-center gap-3 text-sm text-paper/78 transition hover:text-ochre" href={BASE_URL}>
                    <ArrowIcon /> Behance
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {selectedWork ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/88 px-4 py-6 backdrop-blur-xl"
          onClick={() => setSelectedWork(null)}
          role="presentation"
        >
          <div
            className="w-full max-w-5xl overflow-hidden border border-paper/10 bg-charcoal shadow-soft"
            onClick={(event) => event.stopPropagation()}
            role="presentation"
          >
            <div className="grid md:grid-cols-[1.35fr_0.9fr]">
              <div
                className="min-h-[24rem] bg-cover bg-center"
                style={{ backgroundImage: `url('${selectedWork.image}')` }}
              />
              <div className="border-t border-paper/10 p-6 md:border-l md:border-t-0 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.4em] text-paper/55">{selectedWork.type}</p>
                <h3 className="mt-4 font-display text-3xl uppercase tracking-[0.14em] text-paper">
                  {selectedWork.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-paper/72">{selectedWork.summary}</p>
                <button
                  type="button"
                  onClick={() => setSelectedWork(null)}
                  className="mt-8 inline-flex items-center gap-3 border border-paper/15 px-4 py-3 text-[11px] uppercase tracking-[0.35em] text-paper transition hover:border-ochre hover:text-ochre"
                >
                  Close <ArrowIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
