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

    let RefiningPlank = Item('Refining Plank', 1, Profession.Carpentry)
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

    Recipe('Log', [{item: Trunk, quantity: 1}], [{ item: Log, quantityMin: 1, quantityMax: 1 }] )
    Recipe('Bark', [{item: Trunk, quantity: 1}], [{ item: Bark, quantityMin: 1, quantityMax: 1 }] )
    Recipe('Pitch', [{item: TreeSap, quantity: 1}], [{ item: Pitch, quantityMin: 1, quantityMax: 1 }] )
}

function SetupContent() {
    toolbar = ToolbarModule()
    content.InsertEle(toolbar)
    let homePage = SetupHomePage()
    toolbar.addPage(homePage)
    content.InsertEle(homePage)
    console.log(recipes)
    LoadDiagram()
}

function SetupHomePage() {
    let module = PageModule("Home")
    module.innerText = "Welcome Home"

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
                links.push({from: input.item.id , to: output.item.id})
            })
        })
        
    })

    const diagram = new go.Diagram("myDiagramDiv", {layout: new go.ForceDirectedLayout({ // automatically spread nodes apart
        defaultElectricalCharge: 10,
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
    return item
}

function Recipe(name, itemInputs, itemOutputs) {
    let recipe = {}
    recipes.push(recipe)
    recipes.id = recipes.indexOf(recipe)
    recipe.name = name
    recipe.itemInputs = itemInputs
    recipe.itemOutputs = itemOutputs

    return recipe;
}