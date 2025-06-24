let header
let toolbar
let content

let title = "Bit Craft Tool"

let items = []
let recipes = []
const Profession = {
    Unknown: {name:'Unknown', color: '#FFFFFF'},
    Foraging:  {name:'Foraging', color: '#B5FFA8'},
    Foresty:  {name:'Foresty', color: '#C39562'},
    Mining:  {name:'Mining', color: '#999999'},
    Masonry:  {name:'Masonry', color: '#C27BA0'},
    Carpentry:  {name:'Carpentry', color: '#CD893D'},
    Smithing:  {name:'Smithing', color: '#E06666'},
    Hunting:  {name:'Hunting', color: '#4e7b3a'},
    Leatherworking:  {name:'Leatherworking', color: '#F4A6F4'},
    Tailoring:  {name:'Tailoring', color: '#FCE5CD'},
    Farming:  {name:'Farming', color: '#6AA84F'},
    Fishing:  {name:'Fishing', color: '#A4C2F4'},
    Scholar:  {name:'Scholar', color: '#FFFF00'},
}

function LoadScripts() {
    LoadScript("module/table.js")
    LoadScript("module/datatable.js")

    LoadScript("module/pages/toolbar.js")
    LoadScript("module/pages/page.js")
}

LoadScripts()

window.onload = function() {
    SetupCore()
    SetupContent()
}

function SetupCore() {
    document.title = title

    LoadData()
    
    header = CreateEle('div', {id:"header", innerText:title})
    content = CreateEle('div', {id:"content"})

    InsertEles(document.body, [header, content])
}

function LoadData() {
     
    let Berries = Item('Berries', 1, Profession.Foraging)
    let CitricBerries = Item('Citric Berries', 1, Profession.Foraging)
    let Flowers = Item('Flowers', 1, Profession.Foraging)
    let Gypsite = Item('Gypsite', 1, Profession.Foraging)

    let Trunk = Item('Trunk', 1, Profession.Foresty)
    let Log = Item('Log', 1, Profession.Foresty)
    let Bark = Item('Bark', 1, Profession.Foresty)
    let Amber = Item('Amber', 1, Profession.Foresty)
    let TreeSap = Item('Tree Sap', 1, Profession.Foresty)

    let Pitch = Item('Pitch', 1, Profession.Unknown)

    let Braxite = Item('Braxite', 1, Profession.Mining)
    let Pebbles = Item('Pebbles', 1, Profession.Mining)

    let GlassVial = Item('Glass Vial', 1, Profession.Masonry)
    let RefiningBrick = Item('Refining Brick', 1, Profession.Masonry)

    let Plank = Item('Plank', 1, Profession.Carpentry)
    let Timber = Item('Timber', 1, Profession.Carpentry)
    let RefiningPlank = Item('Refining Plank', 1, Profession.Carpentry)
    let StrippedWood = Item('Stripped Wood', 1, Profession.Carpentry)
    let Bucket = Item('Bucket', 1, Profession.Carpentry)
    let WaterBucket = Item('Water Bucket', 1, Profession.Unknown)

    let RefiningIngot = Item('Refining Ingot', 1, Profession.Smithing)

    let AnimalHair = Item('Animal Hair', 1, Profession.Hunting)

    let RefiningLeather = Item('Refining Leather', 1, Profession.Leatherworking)
    let Textile = Item('Textile', 1, Profession.Leatherworking)

    let Straw = Item('Straw', 1, Profession.Farming)
    let CropOil = Item('Crop Oil', 1, Profession.Farming)

    let RefiningCloth = Item('Refining Cloth', 1, Profession.Tailoring)

    let Shells = Item('Shells', 1, Profession.Fishing)
    let FishOil = Item('Fish Oil', 1, Profession.Fishing)

    let Firesand = Item('Firesand', 1, Profession.Scholar)
    let WoodPolish = Item('Wood Polish', 1, Profession.Scholar)
    let MetalSolvant = Item('Metal Solvant', 1, Profession.Scholar)
    let LeatherTreatment = Item('Leather Treatment', 1, Profession.Scholar)

    Recipe('Log', [{item: Trunk, quantity: 1}], [{ item: Log, quantityMin: 6, quantityMax: 6 }, { item: Amber, quantityMin: 0, quantityMax: 1 }] )
    Recipe('Bark', [{item: Trunk, quantity: 1}], [{ item: Bark, quantityMin: 1, quantityMax: 1 }] )
    Recipe('Pitch', [{item: TreeSap, quantity: 1}], [{ item: Pitch, quantityMin: 1, quantityMax: 1 }] )
    Recipe('Stripped Wood', [{item: Log, quantity: 3}], [{ item: StrippedWood, quantityMin: 1, quantityMax: 1 }] )
    Recipe('Plank', [{item: StrippedWood, quantity: 2}], [{ item: Plank, quantityMin: 1, quantityMax: 1 }] )
    Recipe('Timber', [{item: Plank, quantity: 20}], [{ item: Timber, quantityMin: 1, quantityMax: 1 }] )
}

function SetupContent() {
    toolbar = ToolbarModule()
    content.InsertEle(toolbar)
    
    // let homePage = SetupHomePage()
    // toolbar.addPage(homePage)
    // content.InsertEle(homePage)

    let levelingCalc = SetupLevelingCalc()
    toolbar.addPage(levelingCalc)
    content.InsertEle(levelingCalc)
   
    let crafrtingDiagram = SetupCraftingDiagram()
    toolbar.addPage(crafrtingDiagram)
    content.InsertEle(crafrtingDiagram)
    LoadDiagram()
}

function SetupHomePage() {
    let module = PageModule("Home")
    module.innerText = "Welcome Home"
    
    return module
}

let remainingXP = 0
function SetupLevelingCalc() {
    let module = PageModule("Leveling Clac")
    module.innerText = "Levinging Calc"
    module.InsertEle(CreateEle('div', {innerText: "How to use: Imagine cutting a tree for a trunk then choping logs and wondering how many more time until next level. Trucks and Logs would be two steps to complete to complete and will be combined at the bottom. If only one step is needed leave step 2 and 3 blank." }))
    //XP
    module.InsertEle(CreateEle('p'))
    let XP = module.InsertEle(CreateEle('div', {id: "XP"}))
    XP.InsertEle(CreateEle('span', {innerText: " Total Level Required XP: "})) 
    let totalRequiredXP = CreateEle('input', {id: "TotalRequiredXP", type:"text", value:""})
    totalRequiredXP.style = "text-align:right"
    XP.InsertEle(totalRequiredXP)
    XP.InsertEle(CreateEle('span', {innerText: " Aquired XP: "})) 
    let currentXP = CreateEle('input', {id: "CurrentXP", type:"text", value:""})
    currentXP.style = "text-align:right"
    XP.InsertEle(currentXP)
    let xpOutput = CreateEle('div', {innerText: "Remaining XP: 0" })
    XP.InsertEle(xpOutput)
    totalRequiredXP.oninput = () => CalcXP(totalRequiredXP, currentXP, xpOutput)
    currentXP.oninput = () => CalcXP(totalRequiredXP, currentXP, xpOutput)
    module.InsertEle(CreateEle('p'))

    //Step 1 Task
    let work = module.InsertEle(CreateEle('div', {id: "work"}))
    work.InsertEle(CreateEle('div', {innerText: "Step 1 Task" }))
    work.InsertEle(CreateEle('span', {innerText: " XP per action: "}))
    let actionXP1 = CreateEle('input', {id: "ActionXP", type:"text", value:""})
    actionXP1.style = "text-align:right"
    work.InsertEle(actionXP1)
    work.InsertEle(CreateEle('span', {innerText: " Total Task Work: "}))
    let totalWork1 = CreateEle('input', {id: "TotalWork", type:"text", value:""})
    totalWork1.style = "text-align:right"
    work.InsertEle(totalWork1)
    work.InsertEle(CreateEle('span', {innerText: " Work per action: "}))
    let actionWork1 = CreateEle('input', {id: "TotalWork", type:"text", value:""})
    actionWork1.style = "text-align:right"
    work.InsertEle(actionWork1)
    
    //Task 2
    work.InsertEle(CreateEle('div', {innerText: "Step 2 Task" }))
    work.InsertEle(CreateEle('span', {innerText: " XP per action: "}))
    let actionXP2 = CreateEle('input', {id: "ActionXP", type:"text", value:""})
    actionXP2.style = "text-align:right"
    work.InsertEle(actionXP2)
    work.InsertEle(CreateEle('span', {innerText: " Total Task Work: "}))
    let totalWork2 = CreateEle('input', {id: "TotalWork", type:"text", value:""})
    totalWork2.style = "text-align:right"
    work.InsertEle(totalWork2)
    work.InsertEle(CreateEle('span', {innerText: " Work per action: "}))
    let actionWork2 = CreateEle('input', {id: "TotalWork", type:"text", value:""})
    actionWork2.style = "text-align:right"
    work.InsertEle(actionWork2)
    
    //Task 3
    work.InsertEle(CreateEle('div', {innerText: "Step 3 Task" }))
    work.InsertEle(CreateEle('span', {innerText: " XP per action: "}))
    let actionXP3 = CreateEle('input', {id: "ActionXP", type:"text", value:""})
    actionXP3.style = "text-align:right"
    work.InsertEle(actionXP3)
    work.InsertEle(CreateEle('span', {innerText: " Total Task Work: "}))
    let totalWork3 = CreateEle('input', {id: "TotalWork", type:"text", value:""})
    totalWork3.style = "text-align:right"
    work.InsertEle(totalWork3)
    work.InsertEle(CreateEle('span', {innerText: " Work per action: "}))
    let actionWork3 = CreateEle('input', {id: "TotalWork", type:"text", value:""})
    actionWork3.style = "text-align:right"
    work.InsertEle(actionWork3)

    let workOutput = CreateEle('div', {innerText: "Number of Tasks to reach level: " + 0 + " (each task give: 0xp)"})
    work.InsertEle(workOutput)
    actionXP1.oninput = () => CalcWork(actionXP1, actionXP2, actionXP3, totalWork1, totalWork2, totalWork3, actionWork1, actionWork2, actionWork3, workOutput)
    totalWork1.oninput = () => CalcWork(actionXP1, actionXP2, actionXP3, totalWork1, totalWork2, totalWork3, actionWork1, actionWork2, actionWork3, workOutput)
    actionWork1.oninput = () => CalcWork(actionXP1, actionXP2, actionXP3, totalWork1, totalWork2, totalWork3, actionWork1, actionWork2, actionWork3, workOutput)

    actionXP2.oninput = () => CalcWork(actionXP1, actionXP2, actionXP3, totalWork1, totalWork2, totalWork3, actionWork1, actionWork2, actionWork3, workOutput)
    totalWork2.oninput = () => CalcWork(actionXP1, actionXP2, actionXP3, totalWork1, totalWork2, totalWork3, actionWork1, actionWork2, actionWork3, workOutput)
    actionWork2.oninput = () => CalcWork(actionXP1, actionXP2, actionXP3, totalWork1, totalWork2, totalWork3, actionWork1, actionWork2, actionWork3, workOutput)

    actionXP3.oninput = () => CalcWork(actionXP1, actionXP2, actionXP3, totalWork1, totalWork2, totalWork3, actionWork1, actionWork2, actionWork3, workOutput)
    totalWork3.oninput = () => CalcWork(actionXP1, actionXP2, actionXP3, totalWork1, totalWork2, totalWork3, actionWork1, actionWork2, actionWork3, workOutput)
    actionWork3.oninput = () => CalcWork(actionXP1, actionXP2, actionXP3, totalWork1, totalWork2, totalWork3, actionWork1, actionWork2, actionWork3, workOutput)

    return module
}

function CalcXP(totalRequiredXP, currentXP, output) {
    remainingXP = parseFloat(totalRequiredXP.value) - parseFloat(currentXP.value)
    remainingXPText = remainingXP.toLocaleString(
        undefined, // leave undefined to use the visitor's browser 
                    // locale or a string like 'en-US' to override it.
        { minimumFractionDigits: 2 }
        );
    output.innerText = "Remaining XP: "+ remainingXPText + "xp"
}

function CalcWork(actionXP1, actionXP2, actionXP3, totalWork1, totalWork2, totalWork3, actionWork1, actionWork2, actionWork3, output) {
    actionXP1 = parseFloat(actionXP1.value)
    totalWork1 = parseFloat(totalWork1.value)
    actionWork1 = parseFloat(actionWork1.value)

    actionXP2 = parseFloat(actionXP2.value)
    totalWork2 = parseFloat(totalWork2.value)
    actionWork2 = parseFloat(actionWork2.value)

    actionXP3 = parseFloat(actionXP3.value)
    totalWork3 = parseFloat(totalWork3.value)
    actionWork3 = parseFloat(actionWork3.value)

    let step1XP = (actionXP1 * (totalWork1 / actionWork1))
    step1XP = isNaN(step1XP) ? 0 : step1XP
    let step2XP = (actionXP2 * (totalWork2 / actionWork2))
    step2XP = isNaN(step2XP) ? 0 : step2XP
    let step3XP = (actionXP3 * (totalWork3 / actionWork3))
    step3XP = isNaN(step3XP) ? 0 : step3XP
    let taskXP = step1XP + step2XP + step3XP
    let remainingTasks = remainingXP / taskXP

    remainingTasks = remainingTasks.toLocaleString(
        undefined, // leave undefined to use the visitor's browser 
                    // locale or a string like 'en-US' to override it.
        { minimumFractionDigits: 2 }
        );
    taskXP = taskXP.toLocaleString(
        undefined, // leave undefined to use the visitor's browser 
                    // locale or a string like 'en-US' to override it.
        { minimumFractionDigits: 2 }
        );
    output.innerText = "Number of Tasks to reach level: "+ remainingTasks + " (each task give: " + taskXP +"xp)"
}

function SetupCraftingDiagram() {
    let module = PageModule("(WIP) Crafting Diagram")
    module.innerText = "WIP Crafting Diagram"

    module.InsertEle(GetDiagram())
    
    return module
}

function LoadDiagram() {
    let data = []
    let links = []

    items.forEach(item => {
        data.push({key: item.id, text: item.name, fill: item.profession.color })
    })

    recipes.forEach(recipe => {
        recipe.itemInputs.forEach(input => {
            recipe.itemOutputs.forEach(output => {
                let quntity = output.quantityMax != output.quantityMin ? output.quantityMin + "-"+ output.quantityMax : output.quantityMin
                links.push({from: input.item.id , to: output.item.id, text: input.quantity +" to "+ quntity})
            })
        })
        
    })

    const diagram = new go.Diagram("myDiagramDiv", {layout: new go.ForceDirectedLayout({ // automatically spread nodes apart
        defaultElectricalCharge: 20,
        defaultSpringLength: 20
      })})
    diagram.model = new go.GraphLinksModel(data, links)

    diagram.nodeTemplate = new go.Node('Auto', { // the whole node panel
        movable: false,
        locationSpot: go.Spot.Center
      })
        .add(
          // define the node's outer shape, which will surround the TextBlock
          new go.Shape('RoundedRectangle', {
            stroke: 'black'
          }).bind('fill'),
          new go.TextBlock({ font: 'bold 10pt helvetica, bold arial, sans-serif', margin: 4 })
            .bind('text')
        )
    diagram.linkTemplate =
        new go.Link()
            .add(
            new go.Shape(),                           // this is the link shape (the line)
            new go.Shape({ toArrow: "Standard" }),  // this is an arrowhead
            new go.TextBlock()                        // this is a Link label
                .bind("text")
            );
}

function GetDiagram() {
    //"<div id="myDiagramDiv" style="border: solid 1px blue; width:400px; height:150px"></div>"
    let diagram = CreateEle('div', {id:"myDiagramDiv", style:"border: solid 1px blue" })
    diagram.style.width = "800px"
    diagram.style.height = "450px"
    return diagram
}

function GenerateSaveString() {
    json = demoData.data
    text = JSON.stringify(json)
    return text
}

function Item(name, teir, profession) {
    let item = {}
    items.push(item)
    item.id = items.indexOf(item)
    item.name = name
    item.teir = teir
    item.profession = profession;
    item.inputRecipes = []
    item.outputRecipes = []
    return item
}

function Recipe(name, itemInputs, itemOutputs) {
    let recipe = {}
    recipes.push(recipe)
    recipes.id = recipes.indexOf(recipe)
    recipe.name = name
    recipe.itemInputs = itemInputs
    recipe.itemOutputs = itemOutputs

    itemOutputs.forEach(item => {
        item.item.outputRecipes.push(recipe)
    })

    itemInputs.forEach(item => {
        item.item.inputRecipes.push(recipe)
    })

    return recipe;
}