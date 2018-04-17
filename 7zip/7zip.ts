import path = require('path');
import tl = require('vsts-task-lib/task');
import trm = require('vsts-task-lib/toolrunner');

function GetToolRunner() {
    var zip7: trm.ToolRunner = tl.tool(tl.which('7z', true));
    zip7.arg('a');
    zip7.arg('-sfx7z.sfx');

    let outputDirectory = tl.getPathInput('outputDirectory', true, false);
    zip7.argIf(typeof outputDirectory != 'undefined' && tl.filePathSupplied('outputDirectory'), outputDirectory);

    let inputDirectory = tl.getPathInput('inputDirectory', true, false);
    zip7.argIf(typeof inputDirectory != 'undefined' && tl.filePathSupplied('inputDirectory'), inputDirectory);

    return zip7;
}

async function run() {
    try {
        tl.debug('executing 7zip')
        tl.setResourcePath(path.join(__dirname, 'task.json'));

        var zip7: trm.ToolRunner = GetToolRunner();
        await zip7.exec();

        tl.setResult(tl.TaskResult.Succeeded, "Success");
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
