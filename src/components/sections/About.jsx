import React from 'react'
import { motion } from 'framer-motion'
import Badge from '../ui/Badge'

const tools = ["CorelDraw", "Photoshop", "Illustrator", "Canva", "Figma"]

const About = () => {
    return (
        <section id="about-me" className="py-24 bg-neutral-900/30">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">About Me</h2>
                    <div className="h-1 w-24 bg-primary-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-neutral-800/50 to-black border border-neutral-800 hover:border-primary-500/30 transition-colors shadow-lg">
                            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed mb-6">
                                I'm Joshua, a graphic designer in Nigeria with 2+ years of experience. I specialize in creating <span className="text-primary-400 font-medium">functional designs</span> that will help communicate a brand's service or product to its target audience.
                            </p>
                            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
                                Having a keen eye for aesthetics, I make sure that every design I create is not only visually pleasing but also serves a clear strategic purpose.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold mb-8 flex items-center">
                            <span className="text-4xl mr-3">🛠️</span> Tools & Skills
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {tools.map((tool, i) => (
                                <motion.div
                                    key={tool}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Badge className="text-lg py-2 px-5 bg-neutral-800/50 hover:bg-primary-500/20 transition-colors cursor-default">
                                        {tool}
                                    </Badge>
                                </motion.div>
                            ))}
                        </div>

                        {/* Stats or additional info could go here */}
                        <div className="mt-12 grid grid-cols-2 gap-6">
                            <div className="text-center p-6 rounded-xl bg-neutral-900 border border-neutral-800">
                                <span className="block text-4xl font-bold text-primary-500 mb-2">2+</span>
                                <span className="text-neutral-500 text-sm uppercase tracking-wider">Years Experience</span>
                            </div>
                            <div className="text-center p-6 rounded-xl bg-neutral-900 border border-neutral-800">
                                <span className="block text-4xl font-bold text-primary-500 mb-2">50+</span>
                                <span className="text-neutral-500 text-sm uppercase tracking-wider">Projects Completed</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default About
