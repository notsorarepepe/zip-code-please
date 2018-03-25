
export default (config, env, helpers) => {
    
    if (process.env.GH_PAGES) {
        
        config.output.publicPath = '/zip-code-please/'
        
        //console.log(JSON.stringify(config.plugins, null, 4))
        
        config.plugins = config.plugins.map(it => {
            
            if (it.options && it.options.favicon) {
                it.options.url = '/zip-code-please'
                it.options.PUBLIC_URL = '/zip-code-please/'
                it.options.manifest.start_url = '/zip-code-please/'
                it.options.config.manifest.start_url = '/zip-code-please/'
            }
            
            if (it.definitions) {
                if (!it.definitions['process.env'])
                    it.definitions.process.env = {}
                it.definitions['process.env.GH_PAGES'] = true
            }
            
            //console.log('MODIFIED', JSON.stringify(it, null, 4))
            return it
            
        })
        
    }
    
    //require('fs').writeFileSync('config.temp.json', JSON.stringify(config, null, 4), 'utf8')
    //throw new Error('testing')
    
}

