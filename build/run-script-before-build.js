const fs = require('fs')
const os = require('os')

const FILE_INDEX            = __dirname + '/../dist/index.html'
const FILE_CHAT             = __dirname + '/../dist/chat.html'
const JSON_PACKAGE          = __dirname + '/../package.json'
const JSON_CLIENT           = __dirname + '/../src/app-config/client.json'
const TXT_GOOGLE_SCRIPT     = __dirname + '/google_script.txt'
const TXT_GOOGLE_NO_SCRIPT  = __dirname + '/google_no_script.txt'


const CONFIG_CLIENT    = require(JSON_CLIENT)
const CONFIG_PACKAGE   = require(JSON_PACKAGE)
const GOOGLE_SCRIPT    = fs.readFileSync(TXT_GOOGLE_SCRIPT, 'utf8')
const GOOGLE_NO_SCRIPT = fs.readFileSync(TXT_GOOGLE_NO_SCRIPT, 'utf8')

const REPLACE_CONSTANTS = {
    index: {
        fileName: FILE_INDEX,
        replace: [
            [ '<!-- GOOGLE_TAG_MANAGER_SCRIPT -->', GOOGLE_SCRIPT ],
            [ '<!-- GOOGLE_TAG_MANAGER_NO_SCRIPT -->', GOOGLE_NO_SCRIPT ],
            [ '{BUILD_REPLACE_GTM_CODE}', CONFIG_CLIENT.google.gtm ],
            [ '{BUILD_VERSION}', CONFIG_PACKAGE.version ],
            [ '{BUILD_DATE}', (new Date()).toISOString() ]
        ]
    },

    chat: {
        fileName: FILE_CHAT,
        replace: [
            [ '{CONFIG_LICENSE}', CONFIG_CLIENT.chat.license ],
            [ '{CONFIG_GROUP_ID}', CONFIG_CLIENT.chat.groupId ],
            [ '{CONFIG_GREETING}', CONFIG_CLIENT.chat.greeting ],
            [ '{CONFIG_UTM_SOURCE}', CONFIG_CLIENT.chat.utmSource ]
        ]
    }
}

projetoInfo();
replaceConstants();
// makeVersion();

function projetoInfo() {
    console.info('');
    console.info('-------------------------------------------------------------------------');
    console.info('Build projeto Project');
    console.info('-------------------------------------------------------------------------');
}

function replaceConstants() {
    for (let k in REPLACE_CONSTANTS) {
        replaceFileConstants(REPLACE_CONSTANTS[k]);
    }
}

function replaceFileConstants(replaceData) {
    const filePath = replaceData.fileName;
    const replaceList = replaceData.replace;

    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        
        console.info('Replace all constants of: ', 
                        filePath.replace(__dirname + '/', ''));

        let result = data;
        replaceList.forEach((line) => {
            const key = line[0];
            console.info('- replace: ' + key + ' to ', line[1]);
            result = result.replace(new RegExp(key, 'gi'), line[1]);
        })

        fs.writeFile(filePath, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
        console.info('');
    });
}


// function makeVersion() {
//     const content = [];
//     content.push('### Project details');
//     content.push('| Name | ' + PACKAGE_JSON_CONFIG.name + ' |');
//     content.push('| ------ | ------ |');
//     content.push('| Version | ' + PACKAGE_JSON_CONFIG.version + ' |');
//     content.push('| Date | ' + (new Date()).toISOString() + ' |');
//     content.push('| Maker | ' + os.userInfo().username + ' |');

//     fs.writeFile(VERSION_FILE, content.join('\n'), function(err) {
//         if(err) {
//             return console.log(err);
//         }
    
//         console.log('dist/VERSION.md');
//         console.log(content.join('\n'));
//         console.info('');
//     });
// }