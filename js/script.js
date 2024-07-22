/*
  12.11.2019: 2020 CPI Adjustment put into Fee Estimatorrrrrrrrrrrrr
*/
// Global Variables
var projectType1, projectType2, projectType, fixtures, daysForBarricade, rowRestoration, connectionType, dischargePoint, structureType, hello;
var occupRows = [];
var useRows = [];
var fixtureRows = [];
var permits = [];
var currentPermit = "";
var readyForLastPage = false;
var readyforNextPage = false;
var ePermitQualifies = false;
var valuation = 0;
var total = 0;
var grandTotal = 0;
var planRevFee = 0;
var permitFee = 0;
var smifFee = 0;
var stateFee = 0;
var numUnits = 0;
var currentTable = 0;
var currentColumn = 0;
var acres = 0;
var lots = 0;
var shoreval = 0;
var pages = 0;

// ROCC SPECIFIC VARS
var annual = 0;
var useFee = 0;
var bonding = 0;

// NEW FEES 2018 FEE UPDATE
var techFund = 0;
var emergencyFund = 0;
var emergencyFund = 0;
var reserveFund = 0;
var resourceFund = 0;
var siteFee = 0;
var sitePlanrev = 0;
var barricade = 0;
var rowFee = 0;
var preFee = 0;

// GULP FIXING VARS
var activePermit, remodelCost, livingSpaceArea, garageArea, premanArea, basementArea, deckArea;

// HTML Templates
var basicPage = `
  <h3></h3>
    <form class="question-content">
      <div class="question q1"></div>
      <div class="question q2"></div>
      <div class="question q3"></div>
      <div class="question q4"></div>
      <div class="question q5"></div>
      <div class="question q6"></div>
      <div class="question q7"></div>
      <div class="question q8"></div>
      <div class="question q9"></div>
      <div class="question q10"></div>
      <div class="question q11"></div>
    </form>
    <button class="btn back">
      <i class="fa fa-chevron-left" aria-hidden="true"></i>
      <span> Back</span>
    </button>
    <button class="btn next">
      <span>Next </span>
      <i class="fa fa-chevron-right" aria-hidden="true"></i>
    </button>`;

var projectTypeText = `
  I'm working on a
    <select id="project-type-1">
      <option></option>
      <option>residential</option>
      <option>commercial</option>
    </select>
    <span class="tooltip-wrapper mid-page">
      <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
      <div class="tooltip">
        <div>
          <b>Residential:</b>
          Single-Family, Duplex, and Townhomes 1-2 Units</div><div><b>Commercial:</b> Triplex, Multi-Family, Mixed-Use, Industrial, and Non-Residential Buildings
        </div>
      </div>
    </span> project that is
    <select id="project-type-2">
      <option></option>
      <option>a new building</option>
      <option>a remodel on an existing building</option>
      <option>adding to an existing building</option>
      <option>both a remodel and an addition</option>
    </select><span class="tooltip-wrapper mid-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>
        <b>New:</b> Construction of an entirely new building or structure
      </div>
      <div>
        <b>Remodel:</b> Change of the interior characteristics of an existing building and/or space
      </div>
      <div>
        <b>Addition:</b> Extension or increase in floor area or height of a existing structure
      </div>
    </div>
  </span>.`;

var structureTypeText = `
  <p>This project is
    <select id="structureType">
      <option></option>
      <option>a single family home</option>
      <option>a duplex</option>
      <option>an accessory structure</option>
    </select>.
  </p>`;

var livingSpaceText = `
  <p>The new living space added will total
    <input type="number" placeholder="0" min="0" step="50" id="livingSpaceArea"> square feet.
  </p>
  <p class="veneer" style="display:none">
    <span>Is there a roof Veneer?
      <select id="veneerChoice">
        <option>No</option>
        <option>Yes</option>
      </select>
    </span>
  </p>
  <p>The new garage area will total
    <input type="number" placeholder="0" min="0" step="50" id="garageArea"> square feet.
  </p>
  <p>The new premanufactured housing area will total
    <input type="number" placeholder="0" min="0" step="50" id="premanArea"> square feet.
  </p>
  <p>The new unfinished basement area will total
    <input type="number" placeholder="0" min="0" step="50" id="basementArea"> square feet.
  </p>
  <p>The new deck and / or porch area will total
    <input type="number" placeholder="0" min="0" step="50" id="deckArea"> square feet.
  </p>
  <p>New carport area will total
    <input type="number" placeholder="0" min="0" step="50" id="carport"> square feet.
  </p>`;

var accessoryText = `
  <p>I would describe my accessory building(s) as...</p>
  <p><input type="checkbox" name="garage" id="garageCheck">
    <label for="garageCheck">A garage</label>
  </p>
  <p>
    <input type="checkbox" name="carport" id="carportCheck">
    <label for="carportCheck">A carport</label>
  </p>
  <p>
    <input type="checkbox" name="other" id="otherCheck">
    <label for="otherCheck">Some other kind of structure</label>
  </p>`;

var garageAreaText = `
  <p>The new detached garage area will total
    <input type="number" placeholder="0" min="0" step="50" id="garageArea"> square feet.
  </p>`;

var carportAreaText = `
  <p>The new carport structure area will total
    <input type="number" placeholder="0" min="0" step="50" id="carportArea"> square feet.
  </p>`;

var otherAreaText = `
  <p>The new other structure area will total
    <input type="number" placeholder="0" min="0" step="50" id="otherArea"> square feet.
  </p>`;

var occupCatText = `
  <p>This building has
    <select id="occupCat">
      <option></option>
      <option>A-1 Assembly, theaters, with stage</option>
      <option>A-1 Assembly, theaters, without stage</option>
      <option>A-2 Assembly, nightclubs</option>
      <option>A-2 Assembly, restaurants, bars, banquet halls</option>
      <option>A-3 Assembly, churches</option>
      <option>A-3 Assembly, general, community halls, libraries, museums</option>
      <option>A-4 Assembly, arenas</option>
      <option>B Business</option>
      <option>E Educational</option>
      <option>F-1 Factory and industrial, moderate hazard</option>
      <option>F-2 Factory and industrial, low hazard</option>
      <option>H-1 High Hazard, explosives</option>
      <option>H234 High Hazard</option>
      <option>H-5 HPM</option>
      <option>I-1 Institutional, supervised environment</option>
      <option>I-2 Institutional, hospitals</option>
      <option>I-2 Institutional, nursing homes</option>
      <option>I-3 Institutional, restrained</option>
      <option>I-4 Institutional, day care facilities</option>
      <option>M Mercantile</option>
      <option>R-1 Residential, hotels</option>
      <option>R-2 Residential, multiple family</option>
      <option>R-3 Residential, one- and two-family</option>
      <option>R-4 Residential, care/assisted living facilities</option>
      <option>S-1 Storage, moderate hazard</option>
      <option>S-2 Storage, low hazard</option>
      <option>U Utility, miscellaneous</option>
    </select> occupancy.
  </p>`;

var remodelCostText = `<p>The total value of my building costs, materials, and labor for my remodel (separate from any additions) is $ <input type="number" placeholder="-.--" id="remodelCost" min="0" step="50">.</p>`;

var unitsText = `There are <input type="number" placeholder="0" id="units" min="0" step="1"> units in this occupancy.`;

var cnAreaText = `<p>The total area for this type of occupancy is <input id="cnArea" type="number" placeholder="0" min="0" step="50"> square feet.</p>`;

var constructionTypeText = `
  <p>The type of construction for this project is
    <select id="constructionType">
      <option></option>
      <option>IA</option>
      <option>IB</option>
      <option>IIA</option>
      <option>IIB</option>
      <option>IIIA</option>
      <option>IIIB</option>
      <option>IV</option>
      <option>VA</option>
      <option>VB</option>
    </select>.
  </p>
  <p class="disclaimer">If you aren't sure, use VB</p>`;

var occupAddText = `<span class="btn" id="occupAdd">There are more occupancy types</span>`;

var warningText = `<p class='warning'>Required fields are not entered</p>`;

/* TextPrompt:MECHANICAL */
var mechValuationText = `
  <p>The estimated project valuation is
    <input class="mechValuation" type="number" placeholder="0" min="0">
  </p>
`;

/* TextPrompt:PLUMBING */
var plmTypeText = `
  I'm working on a
    <select class="plmProjectType">
      <option></option>
      <option>residential</option>
      <option>commercial</option>
    </select> project.
  `;

var plmFixtureText = `
  <p>There are
    <input class="fixtureQuantity" type="number" placeholder="0" min="0"> fixtures being worked on.
  </p>
  <p>Fixtures may include water closets, basins, bathtubs, showers, sinks, laundry trays, water heaters, dishwashers, wash machines, urinals, backflow preventers, floor drains, drinking fountains, pressure reducing valves, sump pumps, floor sinks, mop sinks, grease traps, or others.</p>`;

var plmEstimationText = `
  <p>The estimated project valuation is
    <input class="plmValuation" type="number" placeholder="0" min="0">
  </p>
  `;

var barricadeIfText = `
  <p>I
    <select class="barricadeIf">
      <option></option>
      <option>will</option>
      <option>will not</option>
    </select> need a barricade for this work.
  </p>`;

var barricadeDaysText = `
  <p>I will be setting up a barricade for
    <input class="daysForBarricade" type="number" placeholder="0" min="0" max="31"> days.
  </p>`;

var rowRestorationText = `
  <p>This project
    <select class="rowRestoration">
      <option></option>
      <option>will</option>
      <option>will not</option>
    </select> require right-of-way restoration work.
  </p>`;

var sewerConnectionTypeText = `
  <p>I'll be
    <select class="connectionType">
      <option></option>
      <option>replacing</option>
      <option>adding</option>
      <option>repairing</option>
    </select> a side sewer.
  </p>`;

var waterConnectionTypeText = `
  <p>I'll be
    <select class="connectionType">
      <option></option>
      <option>replacing</option>
      <option>adding</option>
      <option>repairing</option>
    </select> a water service line.
  </p>`;

var dischargePointText = `
  <p>The discharge point for the storm connection is
    <select class="dischargePoint">
      <option></option>
      <option>a catch basin</option>
      <option>a manhole</option>
      <option>an on-site system</option>
      <option>a curb drain</option>
    </select>.
  </p>`;

var clearingOrGrading = `
  <p>This project will be
    <select class="clearingOrGrading">
      <option></option>
      <option>clearing</option>
      <option>grading</option>
    </select> the development area.
  </p>`;

var sdevFeeText = `
  <p>The total amount of new/replaced hard surface area is
    <input type="number" id="hardSurfaceArea" min="0" step="1000"> square feet.
  </p>
  <p>The total area being cut from the site is
    <input type="number" id="cutArea" min="0" step="50"> cubic yards.
  </p>
  <p>The total area being filled on the site is
    <input type="number" id="fillArea" min="0" step="50"> cubic yards.
  </p>
  <p>The total site area to be disturbed is
    <input type="number" id="disturbedArea" min="0" step="1000"> square feet.
  </p>`;

var woFeeText = `<p>Work Order and Major SDEV Level 2 Fees are charged on an hourly basis and invoiced monthly, beginning during permit review:<br><br>
<b>Review/Inspection</b> - $190/hour<br>
<b>Emergency Preparedness Fund</b> - 5% of review/inspection hourly charges<br>
<b>Natural Resources Fund</b> - 5% of review/inspection hourly charges<br>
<b>Technology Fund</b> - 5% of review/inspection hourly charges<br>
<b>Reserve Fund</b> - 2% of review/inspection hourly charges<br><br>
Click <b>Next</b> to advance to the next selected permit type/final estimation.
</p>`;

var clearingAreaText = `
  <p>The total clearing area is
    <input type="number" id="clearingArea" min="0" step="50"> square feet.
  </p>`;

var pavedAreaText = `
  <p>The total paved area is
    <input type="number" id="pavedArea" min="0" step="50"> square feet.
  </p>`;

var signCostText = `
  <p>The total construction cost, including materials and labor, for the sign is $
    <input type="number" placeholder="-.--" id="signCost" min="0" step="50">.
  </p>`;

var demoTypeText = `
  <p>This structure being demolished is a
    <select id="demoType">
      <option></option>
      <option>residential</option>
      <option>commercial</option>
    </select> structure.
  </p>`;

var demoAccPlmText = `
  <p>There
    <select id="demoAcc">
      <option></option>
      <option>is</option>
      <option>is not</option>
    </select> plumbing serving the accessory structure.
  </p>`;

var luPermitTypeText = `
  <p>I'm looking for a(n)
    <select id="luPermitType">
    <option></option>
      <option>accessory dwelling unit</option>
      <option>additional/expanded notice</option>
      <option>conditional use</option>
      <option>critical areas</option>
      <option>development regulation agreement</option>
      <option>environmental review</option>
      <option>information requests</option>
      <option>major modification of permit</option>
      <option>open space use classification</option>
      <option>plats / BLAs / segregations / combinations</option>
      <option>shoreline</option>
      <option>site approval</option>
      <option>site rezone/reclassification</option>
      <option>special development permit</option>
      <option>temporary homeless camp</option>
      <option>variance</option>
      <option>waiver</option>
    </select> land use permit.
  </p>`;


var accDwellingSubtypeText = `
  <select id="luPermitSubtype">
    <option></option>
    <option>attached</option>
    <option>detached</option>
    <option>ADU reauthorization</option>
  </select>`;

var addExpandSubtypeText = `
  <select id="luPermitSubtype">
    <option></option>
    <option>100-400 feet (additional only)</option>
    <option>1000 feet</option>
    <option>2500 feet</option>
  </select>`;

var condUseSubtypeText = `
  <select id="luPermitSubtype">
    <option></option>
    <option>large scale retail</option>
    <option>correctional facility</option>
    <option>detention facility</option>
    <option>all others</option>
  </select>`;

var critAreaSubtypeText = `
  <select id="luPermitSubtype">
    <option></option>
    <option>activities allowed with staff review</option>
    <option>development permit</option>
    <option>minor development permit</option>
    <option>verification</option>
    <option>mitigation monitoring review</option>
  </select>`;
  
  var DRASubtypeText = `
  <select id="luPermitSubtype">
    <option></option>
    <option>affordable housing (not in designated center) - 1 acre or more in size</option>
    <option>downtown regional growth center - landmarks historic structure</option>
    <option>downtown regional growth center - public ownership</option>
    <option>international financial services area (IFSA)</option>
    <option>public facility site - 5 acres or more in size</option>
    <option>tacoma mall neighborhood regional growth center - 2 acres or more in size</option>
    </select>`;

var envRevSubtypeText = `
  <select id="luPermitSubtype">
    <option></option>
    <option>environmental impact statement</option>
    <option>SEPA with a discretionary land use permit</option>
    <option>residential buildings (20+ units, under 12000 sf), signs, parking lots, misc actions</option>
    <option>residential buildings (20+ units, over 12000 sf), grading (over 500 cy)</option>
  </select>`;

var infReqSubtypeText = `
  <select id="luPermitSubtype">
    <option></option>
    <option>determination or interpretation by director</option>
    <option>zoning verification letter</option>
  </select>`;

var platsSubtypeText = `
  <select id="luPermitSubtype">
    <option></option>
    <option>binding site plan Approval</option>
    <option>segregation/combination</option>
    <option>boundary line adjustment (2 Lots)</option>
    <option>boundary line adjustment (3+ Lots)</option>
    <option>short plat (2-4 Lots)</option>
    <option>short plat (5-9 Lots)</option>
    <option>preliminary plat (10+ Lots)</option>
    <option>final plat (2-9 Lots)</option>
    <option>final plat (10+ Lots)</option>
    <option>GIS drafting (New Plats)</option>
    <option>GIS drafting (New Short Plat or BLA)</option>
    <option>E-Vault scanning and indexing</option>
  </select>`;

var shoreSubtypeText = `
  <select id="luPermitSubtype">
    <option></option>
    <option>single family</option>
    <option>exemption</option>
    <option>other</option>
    <option>revisions - single family</option>
    <option>revisions - other</option>
    <option>sign waiver</option>
    <option>extension</option>
  </select>`;

var varSubtypeText = `
  <select id="luPermitSubtype">
    <option></option>
    <option>height - main building</option>
    <option>height - accessory building</option>
    <option>single family residential</option>
    <option>other</option>
  </select>`;

// Land Use 3rd Question Section
var pages3rdQuestText = `
  <p>There are
    <input type="number" id="thirdQuest" min="2" step="1"> pages in this plat.
  </p>`;

var plats3rdQuestText = `
  <p>There are
    <input type="number" id="thirdQuest" min="2" step="1"> lots in this plat.
  </p>`;

var shore3rdQuestText = `
  <p>The total valuation of the shoreline work is
    <input type="number" placeholder="-.--" id="thirdQuest" min="0" step="100000">.
  </p>`;

var luAddText = `<span class="btn" id="luAdd">I'll need another permit</span>`;

var fireCategoriesText = `
  <p>This project will include
    <select id="fireCategories">
      <option></option>
      <option>fire alarms</option>
      <option>pre-engineered systems</option>
      <option>kitchen hood suppression systems</option>
      <option>new water based fire suppression systems</option>
      <option>fire sprinkler tenant improvement</option>      
      <option>smoke control systems</option>
      <option>underground fire systems</option>
    </select>.
  </p>`;
  
// <option>private fire service mains and their appurtenances</option>
var fireAlarmText = `
  <p>Number of devices:
    <input type="number" min="0">
  </p>`;

var fireUnderground = `
  <p>Number of underground devices:
    <input type="number" min="0">
  </p>`;

var firePreEngText = `
  <p>Number of systems:
    <input type="number" id="firePreEngSys" min="0">
  </p>
  <p>Number of nozzles:
    <input type="number" id="firePreEngNoz" min="0">
  </p>`;

var fireKitchenText = `
  <p>Number of systems:
    <input type="number" min="0">
  </p>`;

var fireServMainsText = `
  <p>Number of hydrants, sprinkler supplies, and fire department connections:
    <input type="number" min="0">
  </p>`;

var fireSprinklerText = `
  <p>Number of heads:
    <input type="number" id="fireSprinklerHeads" min="0">
  </p>`;

var fireSuppressionText = `
  <p>Number of fire sprinkler risers:
    <input type="number" id="fireSuppressionRisers" min="0">
  </p>
  <p>Number of heads:
    <input type="number" id="fireSuppressionHeads" min="0">
  </p>
  <p>Number of standpipes:
    <input type="number" id="fireSuppressionStandpipes" min="0">
  </p>
  <p>Number of fire pumps:
    <input type="number" id="fireSuppressionPumps" min="0">
  </p>`;

var eventTypeText = `
  <p>This organization hosting this event is
    <select id="eventOrgType">
      <option></option>
      <option>residential or non-profit</option>
      <option>commercial</option>
    </select>.
  </p>`;

var eventBlocksText = `
  <p>The number of blocks to close for the event will be
    <input type="number" id="eventBlocks" min="0">.
  </p>`;


var eventDateText = `
  <p>The date for the event will be
    <input type="date" id="eventDate">.
  </p>`;

// Pre-Development Text
var preTypeText = `
  <div id="preTextArea">
    <p><span class='optionChoice'><input type="radio" name="optionA" id="preOptionA"> Option A - </span>
      <span class='optionText'>Includes electronic review from multiple departments and agencies compiled into a comprehensive Comment Memo.</span>
    </p>
    <div style="clear:both"></div>
    <p><span class='optionChoice'><input type="radio" name="optionA" id="preOptionB"> Option B - </span>
      <span class='optionText'>Includes Option A Comment Memo, an in-person meeting following the Comment Memo, and a post-meeting Comment Memo.</span>
    </p>
    <p>Up to 100% of the pre-development fees will be credited towards the associated building permit review fees.</p>
  </div>
  `;

// Right of Way HTML - ROW HTML
var rowTypeText = `
  <p>Project will involve
    <select id="rowType">
      <option></option>
      <option>construction within (RCON)</option>
      <option>occupancy of (ROCC)</option>
      <option>use of (RUSE)</option>
      <option>utility work in (RUTI)</option>
    </select> the right-of-way.
  </p>`;

var rowConstructionTypeText = `
  <p>This project will include...<p>
    <input type="checkbox" name="curb" id="rconCurb">
      <label for="rconCurb">Curb or gutter work</label>
  </p>
  <p>
    <input type="checkbox" name="sidewalk" id="rconSidewalk">
      <label for="rconSidewalk">Work on the sidewalk</label>
  </p>
  <p><input type="checkbox" name="driveway" id="rconDriveway">
    <label for="rconDriveway">Work on a driveway</label>
  </p>
  <p>
    <input type="checkbox" name="trenchBore" id="rconTrenchBore">
      <label for="rconTrenchBore">Trench and / or bore work</label>
  </p>
  <p>
    <input type="checkbox" name="addPaveArea" id="addPaveArea">
      <label for="addPaveArea">Paving in the right-of-way other than sidewalk</label>
  </p>`;

var rowOccupancyText = `
  <p>This permit is for: <p>
    <select id="rowOcc">
      <option></option>
      <option>residential</option>
      <option>commercial</option>
      <option>temporary sidewalk cafe</option>
      <option>sidewalk cafe</option>
      <option>ground water monitoring well</option>
    </select>
  </p>`;

var rowOccWellText = `
  <p>Amount of wells:
    <input type="number" id="rowWell" placeholder="0" min="1">
  </p>`;

var rowSidewalkWorkText = `
  <p>In this project, I will be
    <select id="rowSidewalkWork">
      <option></option>
      <option>adding a new</option>
      <option>replacing or repairing an existing</option>
    </select> sidewalk.
  </p>`;

var rowGutterText = `
  <p>There
    <select id="rowGutter">
      <option></option>
      <option>is</option>
      <option>is not</option>
    </select> an existing curb or gutter with this sidewalk.
  </p>`;

var rowSidewalkSizeText = `
  <p>The length of the sidewalk is
    <input type="number" id="rowSidewalkSize" placeholder="0" min="1" step="10"> feet. <br><b>(Calculation assumes sidewalk is 5ft wide)</b>
  </p>`;
var rowGutterLengthText = `
  <p>The total length of the curb or gutter is
    <input type="number" id="rowGutterLength" placeholder="0" min="1" step="10"> linear feet.
  </p>`;
var rowDrivewayText = `
  <p>There
    <select id="rowDriveway">
      <option></option>
      <option>is</option>
      <option>is not</option>
    </select> a driveway in this project.
  </p>`;
var rowDrivewayNumText = `
  <p>There are
    <input type="number" id="rowAsphaltDrivewayNum" placeholder="0" min="1"> asphalt driveways.
  </p>
  <p>There are
    <input type="number" id="rowConcreteDrivewayNum" placeholder="0" min="1"> concrete driveways.
  </p>`;
var rowPavingText = `
  <p>The paved area totals
    <input type="number" id="rowPaving" placeholder="0" min="1"> square feet.
  </p>`;

var rowTrenchTypeText = `
  <p>The trench is
    <select id="rowTrenchType">
      <option></option>
      <option>an open cut trench</option>
      <option>a monitoring well, a bore, or potholing</option>
    </select>.
  </p>`;

var rowTrenchLengthText = `
  <p>The total length of the trench is
    <input type="number" id="rowTrenchLength" placeholder="0" min="1" step="10"> linear feet.
  </p>`;

var rowBoreCountText = `
  <p>There are
    <input type="number" placeholder="0" id="rowBoreCount" min="1"> bores (not including geotechnical or directional bores).</p>`;

var rowUseDaysText = `
  <p>This project will use the right-of-way for
    <input type="number" id="rowUseDays" placeholder="0" min="1" step="7"> days.
  </p>`;

var rowBannerText = `
  <p>There
    <select id="rowBanner">
      <option></option>
      <option>will</option>
      <option>will not</option>
    </select> be a banner in this project.
  </p>`;

var rowBannerBlocksText = `
  <p>This banner spans
    <input type="number" id="rowBannerBlocks" placeholder="0" min="1"> blocks.
  </p>`;

var rowBannerInstallText = `
  <p>The banner will be installed by a
    <select id="rowBannerInstall">
      <option></option>
      <option>city</option>
      <option>private</option>
    </select> contractor.
  </p>`;

var rowSMVTypeText = `
  <p>This is
    <select id="rowSMVType">
      <option></option>
      <option>an annual</option>
      <option>a single trip</option>
      <option>a house move</option>
    </select> permit.
  </p>`;

var rowTrenchText = `
  <p>There
    <select id="rowTrench">
      <option></option>
      <option>will</option>
      <option>will not</option>
    </select> be a trench in this project.
  </p>`;

var rowBoresText = `
  <p>There
    <select id="rowBores">
      <option></option>
      <option>will</option>
      <option>will not</option>
    </select> be bores in this project.
  </p>`;

var rowUseTypeText = `
  <p>The use of this permit is for
    <select id="rowUse">
      <option></option>
      <option>a special motor vehicle</option>
      <option>overtime parking</option>
      <option>a banner</option>
    </select>.
  </p>`;

  var signTypeText = `
  <p>The use of this permit is for
    <select id="rowUse">
      <option></option>
      <option>overtime parking</option>
    </select>.
  </p>`;

var rowHoliday = `
  <p>
    <input type="checkbox" name="holiday" id="rowHoliday">
    <label for="rowHoliday">This use includes holiday decorations.</label>
  </p>`;

var pg1and2instructions = `
  <p><b>This fee estimator is intended for informational purposes only</b> and will help you estimate what your building permit fee will be.
  </p>
  <p>Click on the <span class="underline">underlined blank spaces</span> in the sentences below to select from a dropdown menu of choices or enter a number value based off of what fits in the sentence.
  </p>
  <p>Hover over <span class="green">green</span> question marks to get more information about the item next to the icon.
  </p>
  <p>If you need help, click on the <span class="green">Technical Issues</span> button at the bottom of the page and describe the problem above the dotted line.
  </p>`;

var pg3disclaimer = `
  <div class="disclaimer">This fee estimator is intended for informational purposes only, and currently available for limited permit types. Please note, complete identification of all required permits and final fee calculations will be completed during the processing of a permit application.</div>`;

// Permit Fee Details Sections
var permitFeeDetails = `
  <div class="fee-sub-items">
  </div>`;

var feeDetailsVar = [
    `<p class="base">Base permit fee:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>The <b>base permit fee</b> includes the fees associated with the fields you filled out on the last page.</b>
      </div>
    </div>
  </span>`,
    `<p class="techFund">Technology Fund:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>Technology operations and modernization in support of permitting and development services.
      </div>
    </div>
  </span>`,
    `<p class="emergencyFund">Emergency Preparedness Fund:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>Support emergency preparedness programs related to buildings, structures, and associated site development.
      </div>
    </div>
  </span>`,
    `<p class="resourceFund">Natural Resource Fund:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>Protection of natural resources in and surrounding the City.
      </div>
    </div>
  </span>`,
    `<p class="reserveFund">Reserve Fund:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>Providing adequate reserve funds for maintaining permit services during periods of economic fluctuation or other unanticipated needs.
      </div>
    </div>
  </span>`,
    `<p class="state">State building fee:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>The <b>state building fee</b> is calculated by staff, the indicated amount is the base cost based on permit type.
      </div>
    </div>
  </span>`,
    `<p class="review">Plan review fee:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>The cost of reviewing submitted plans for required for permit.
      </div>
    </div>
  </span>`,
    `<p class="annual">Annual Renewal fee:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>Yearly fee that includes site inspection for compliance, file review, insurance review, and application of fee escalators/adjustments as required. An annual statement will be sent to the property owner on a yearly basis, but is not required at the time of submittal.
      </div>
    </div>
  </span>`,
    `<p class="useFee">Use fee:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>Groundwater monitoring wells have a set use fee of $175 for the first well and $150 for each additional well. A billing statement will be sent following the execution of the permit and then annually until the permit has been released. See Tacoma Municipal Code 9.08.075 for additional details.
      </div>
    </div>
  </span>`,
    `<p class="bonding">Bonding Requirement:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>Groundwater monitoring wells require a bond with the City in the amount of $10,000 for each well authorized.  The bonding requirement must be met prior to issuance of the Right-of-Way Occupancy Permit, but is not required at the time of submittal.  See http://tacomapermits.org/rocc-permits for additional details and forms.
      </div>
    </div>
  </span>`,
    `<p class="siteFee">Site Development Fee:
    <span class="money"></span>
  </p>`,
    `<p class="sitePlanrev">Site Plan Review:
    <span class="money"></span>
  </p>`,
    `<p class="barricadeFee">Barricade Fee:
    <span class="money"></span>
  </p>`,
  `<p class="rowFee">Patch Inspection Fee:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>A Patch Inspection Fee is required when a project involves right-of-way restoration.
      </div>
    </div>
  </span>`,
    `<p class="preFee">Pre-Development Fee:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>The fees for the pre-development service will be paid prior to the initial review and prior to any follow up meeting. However, if the project moves into permitting, PDS will credit up to 100% of the pre-development fees towards the plan review fees for the associated building permit.</div>
    </div>
  </span>`,
];

/* FUNCTIONS START */
$(document).on('click', '.back', function() {
    back();
});
$(document).on('click', '.next', function() {
    next();
});
$(document).on('click', '#feedback', function() {
    var feedback = "mailto:iteam@cityoftacoma.org?subject=Problems using the fee estimator&body=%0D%0A%0D%0A----- Leave your comments above. Do not edit beneath this line -----%0D%0A%0D%0A";
    for (var i in permits) {
        if (permits[i] == "bld") {
            feedback += "Building Permit: %0D%0A%0D%0AProject Type 1: " + $('#project-type-1').val() + "%0D%0AProject Type 2: " + $('#project-type-2').val();
            if (projectType == "RN" || projectType == "RA") {
                feedback += "%0D%0AStructure Type: " + $('#structureType').val();
                if ($('#structureType').val() == "a single family home" || $('#structureType').val() == "a duplex") {
                    feedback += "%0D%0ALiving space: " + livingSpaceArea.val() + "%0D%0AGarage: " + garageArea.val() + "%0D%0APreman: " + premanArea.val() + "%0D%0ABasement: " + basementArea.val() + "%0D%0ADeck: " + deckArea.val();
                } else if ($('#structureType').val() == "an accessory structure") {
                    if (garageCheck.is(':checked')) {
                        feedback += "%0D%0AGarage: " + garageArea.val();
                    }
                    if (carportCheck.is(':checked')) {
                        feedback += "%0D%0ACarport: " + carportArea.val();
                    }
                    if (otherCheck.is(':checked')) {
                        feedback += "%0D%0AOther: " + otherArea.val();
                    }
                }
            } else if (projectType == "RR" || projectType == "CR") {
                feedback += "%0D%0ARemodel cost: " + $('#remodelCost').val();
            } else if (projectType == "CN" || projectType == "CA") {
                if (occupRows.length == 0) {
                    occupRows.push($('#occupCat').val(), $('#constructionType').val(), $('#cnArea').val());
                }
                for (i = 0; i < occupRows.length; i += 3) {
                    feedback += "%0D%0AOccupancy #" + ((i + 3) / 3) + ": " + occupRows[i] + "%0D%0AConstruction type: " + occupRows[i + 1] + "%0D%0ASquare Feet: " + occupRows[i + 2];
                }
                if (numUnits > 0) {
                    feedback += "%0D%0AUnits: " + numUnits;
                }
            } else if (projectType == "RB") {
                feedback += "%0D%0AStructure Type: " + $('#structureType').val();
                if ($('#structureType').val() == "a single family home" || $('#structureType').val() == "a duplex") {
                    feedback += "%0D%0ALiving space: " + $('#livingSpaceArea').val() + "%0D%0AGarage: " + $('#garageArea').val() + "%0D%0APreman: " + $('#premanArea').val() + "%0D%0ABasement: " + $('#basementArea').val() + "%0D%0ADeck: " + $('#deckArea').val();
                } else if ($('#structureType').val() == "an accessory structure") {
                    if ($('#garageCheck').is(':checked')) {
                        feedback += "%0D%0AGarage: " + $('#garageArea').val();
                    }
                    if ($('#carportCheck').is(':checked')) {
                        feedback += "%0D%0ACarport: " + $('#carportArea').val();
                    }
                    if ($('#otherCheck').is(':checked')) {
                        feedback += "%0D%0AOther: " + $('#otherArea').val();
                    }
                }
                feedback += "%0D%0ARemodel cost: " + $('#remodelCost').val();
            } else if (projectType == "CB") {
                if (occupRows.length == 0) {
                    occupRows.push($('#occupCat').val(), $('#cnArea').val());
                }
                for (i = 0; i < occupRows.length; i += 3) {
                    feedback += "%0D%0AOccupancy #" + ((i + 3) / 3) + ": " + occupRows[i] + "%0D%0AConstruction type: " + occupRows[i + 1] + "%0D%0ASquare Feet: " + occupRows[i + 2];
                }
                if (numUnits > 0) {
                    feedback += "%0D%0AUnits: " + numUnits;
                }
                feedback += "%0D%0ARemodel cost: " + $('#remodelCost').val();
            }
        } else if (permits[i] == "plm") {
            feedback += "%0D%0A%0D%0APlumbing Permit:%0D%0AFixtures: " + $('#pgplm .fixtureQuantity').val();
        } else if (permits[i] == "sewer") {
            feedback += "%0D%0A%0D%0ASewer Permit:%0D%0ABarricade days: " + $('#pgsewer .daysForBarricade').val() + "%0D%0ARight-of-way: " + $('#pgsewer rowRestoration').val() + "%0D%0AConnection type: " + $('#pgsewer .connectionType').val();
        } else if (permits[i] == "wtr") {
            feedback += "%0D%0A%0D%0AWater Permit:%0D%0ABarricade days: " + $('#pgwtr .daysForBarricade').val() + "%0D%0AConnection type: " + $('#pgwtr .connectionType').val();
        } else if (permits[i] == "storm") {
            feedback += "%0D%0A%0D%0AStorm Permit:%0D%0ABarricade days: " + $('#pgstorm .daysForBarricade').val() + "%0D%0ARight-of-way: " + $('#pgstorm .rowRestoration').val() + "%0D%0ADischarge point: " + $('#pgstorm .dischargePoint').val();
        } else if (permits[i] == "sitedev") {
            feedback += "%0D%0A%0D%0ASite Development:%0D%0ACut area: " + $('.cutArea').val() + "%0D%0AFill area: " + $('#fillArea').val() + "%0D%0AClearing area: " + $('#clearingArea').val() + "%0D%0APaved area: " + $('#pavedArea').val();
        } else if (permits[i] == "demo") {
            feedback += "%0D%0A%0D%0ADemolition:%0D%0AStructure type: " + $('#demoType').val() + "%0D%0ATotal area: " + $('#demoArea').val() + "%0D%0ATotal value: " + $('#demoCost').val();
        } else if (permits[i] == "sign") {
            feedback += "%0D%0A%0D%0ASign:%0D%0ACost: " + $('#signCost').val();
        } else if (permits[i] == "land") {
            if (useRows.length == 0) {
                useRows.push($('#luPermitType').val());
                useRows.push($('#luPermitSubtype').val());
            }
            for (var i = 0; i < useRows.length; i += 2) {
                feedback += "%0D%0ALand Use #" + ((i + 2) / 2) + ": %0D%0ACategory: " + useRows[i] + "%0D%0ASubcategory: " + useRows[i + 1];
            }
        } else if (permits[i] == "fire") {
            feedback += "%0D%0AFire boxes: ";
            $.each($('#pgfire input'), function() {
                if ($(this).val() > 0) {
                    feedback += $(this).val() + ", ";
                } else {
                    feedback += "empty, ";
                }
            });
        } else if (permits[i] == "event") {
            feedback += "%0D%0AEvent:%0D%0AResidential or commercial: " + $('#eventOrgType').val() + "%0D%0ABlocks Closed: " + $('#eventBlocks').val() + "%0D%0AEvent date: " + $('#eventDate').val();
        } else if (permits[i] == "row") {
            feedback += "%0D%0AROW:%0D%0AProject Type: " + $('#rowType').val();
            if ($('#rowType').val() == "construction within (RCON)") {
                feedback += "%0D%0ASidewalk work: " + $('#rowSidewalkWork').val();
                if ($('#rowSidewalkWork').val() == "adding a new") {
                    feedback += "%0D%0AGutter: " + $('#rowGutter').val();
                    if ($('#rowGutter').val() == "is") {
                        feedback += "%0D%0AGutter length: " + $('#rowGutterLength').val();
                    }
                }
                feedback += "%0D%0ASidewalk size: " + $('#rowSidewalkSize').val();
                if ($('#rowDriveway').val() == "is") {
                    feedback += "%0D%0AAsphalt driveways: " + $('#rowAsphaltDrivewayNum').val() + "%0D%0AConcrete driveways: " + $('#rowConcreteDrivewayNum').val();
                }
                feedback += "%0D%0APaved area: " + $('#rowPaving').val() + "%0D%0ATrench type: " + $('#rowTrenchType').val();
                if ($('#rowTrenchType').val() == "an open cut trench") {
                    feedback += "%0D%0ATrench length: " + $('#rowTrenchLength').val();
                } else if ($('#rowTrenchType').val() == "a monitoring well, a bore, or potholing") {
                    feedback += "%0D%0ABore count: " + $('#rowBoreCount').val();
                }
            } else if ($('#rowType').val() == "use of") {
                feedback += "%0D%0AUse days: " + $('#rowUseDays').val() + "%0D%0ABanner: " + $('#rowBanner').val();
                if ($('#rowBanner').val() == "will") {
                    feedback += "%0D%0ABanner install: " + $('#rowBannerInstall').val() + "%0D%0ABanner blocks: " + $('#rowBannerBlocks').val();
                }
                feedback += "%0D%0ASMV: " + $('#rowSMV').val();
                if ($('#rowSMV').val() == "will") {
                    feedback += "%0D%0ASMV type: " + $('#rowSMVType').val();
                }
            } else if ($('#rowType').val() == "utility work in") {
                if ($('#rowTrench').val() == "will") {
                    feedback += "%0D%0ATrench length: " + $('#rowTrenchLength').val();
                }
                if ($('#rowBores').val() == "will") {
                    feedback += "%0D%0ABore count: " + $('#rowBoreCount').val();
                }
            }
            feedback += "%0D%0ABarricade days: " + $('#pgrow .daysForBarricade').val();
        }
    }
    feedback += "%0D%0A%0D%0AApp Version: v5.0.0";
    var w = window.open(feedback);
    setTimeout(function() {
        w.close();
    }, 100);
});
$(document).on('click', '.description-expand', function() {
    $('.description').toggleClass('open');
});
$(document).on('click', '.fee-item header', function() {
    $(this).siblings('.fee-sub-items').toggleClass('open');
    $(this).children('.fa-caret-right').toggleClass('open');
});
$(document).on('click', 'h4', function() {
    $(this).children('i').toggleClass('open');
    $(this).siblings('.permit-category').toggleClass('open');
});
$(document).on('click', 'button', function(e) {
    e.preventDefault();
});
$(document).keydown(function(e) {
    if (e.keyCode == 37) { // left
        back();
    } else if (e.keyCode == 39 || e.keyCode == 13 || e.keyCode == 32) { // right arrow, enter, spacebar
        next();
    }
});

function showError(button, boxes) {
    button.addClass('shake');
    setTimeout(function() {
        button.removeClass('shake');
    }, 500);
    boxes.addClass('look-here');
    setTimeout(function() {
        boxes.removeClass('look-here');
    }, 500);
}

function putIn(elem, txt) {
    elem.show().addClass('fade').html(txt);
}

function takeOut(elem) {
    elem.hide().removeClass('fade').html("");
}

function bldPermit() {
    $('#pgbld .question').hide();
    putIn($('#pgbld h3'), "Building");
    putIn($('#pgbld .q1'), projectTypeText);
    $('#pgbld .q1 select').change(function() {
        takeOut($('#pgbld .q2, #pgbld .q3, #pgbld .q4, #pgbld .q5, #pgbld .q6, #pgbld .q7, #pgbld .q8'));
        if ($('#project-type-1').val() == "residential") {
            projectType1 = "R";
        } else if ($('#project-type-1').val() == "commercial") {
            projectType1 = "C";
        }
        if ($('#project-type-2').val() == "a new building") {
            projectType2 = "N";
        } else if ($('#project-type-2').val() == "a remodel on an existing building") {
            projectType2 = "R";
        } else if ($('#project-type-2').val() == "adding to an existing building") {
            projectType2 = "A";
        } else if ($('#project-type-2').val() == "both a remodel and an addition") {
            projectType2 = "B";
        }
        if ($('#project-type-1').val() != "" && $('#project-type-2').val() != "") {
            projectType = projectType1 + projectType2;
            if (projectType == "RN" || projectType == "RA") {
                putIn($('#pgbld .q2'), structureTypeText);
                $('#structureType').change(function() {
                    takeOut($('#pgbld .q3, #pgbld .q4, #pgbld .q5, #pgbld .q6, #pgbld .q7, #pgbld .q8'));
                    if ($(this).val() == "a single family home" || $(this).val() == "a duplex") {
                        putIn($('#pgbld .q3'), livingSpaceText);
                        $('#livingSpaceArea').bind('click keyup', function() {
                            if ($(this).val() > 2000) {
                                $('.veneer').show();
                            } else {
                                $('#veneerChoice').val("No");
                                $('.veneer').hide();
                            }
                        });
                    } else if ($(this).val() == "an accessory structure") {
                        putIn($('#pgbld .q3'), accessoryText);
                    } else {
                        takeOut($('#pgbld .q4, #pgbld .q5, #pgbld .q6, #pgbld .q7, #pgbld .q8'));
                    }
                    $('#garageCheck').change(function() {
                        if ($(this).is(':checked')) {
                            putIn($('#pgbld .q4'), garageAreaText);
                        } else {
                            takeOut($('#pgbld .q4'));
                        }
                    });
                    $('#carportCheck').change(function() {
                        if ($(this).is(':checked')) {
                            putIn($('#pgbld .q5'), carportAreaText);
                        } else {
                            takeOut($('#pgbld .q5'));
                        }
                    });
                    $('#otherCheck').change(function() {
                        if ($(this).is(':checked')) {
                            putIn($('#pgbld .q6'), otherAreaText);
                        } else {
                            takeOut($('#pgbld .q6'));
                        }
                    });
                });
            } else if (projectType == "RR" || projectType == "CR") {
                putIn($('#pgbld .q2'), remodelCostText);
            } else if (projectType == "CN" || projectType == "CA") {
                occupRows = [];
                numUnits = 0;
                putIn($('#pgbld .q2'), occupCatText);
                putIn($('#pgbld .q3'), cnAreaText);
                putIn($('#pgbld .q4'), constructionTypeText);
                putIn($('#pgbld .q7'), occupAddText);
                takeOut($('#pgbld .q5, #pgbld .q6, #pgbld .q8'));
                $('#occupCat').change(function() {
                    if ($(this).val().match("^R")) {
                        putIn($('#pgbld .q5'), unitsText);
                    } else {
                        takeOut($('#pgbld .q5'));
                    }
                    putIn($('#pgbld .q3'), cnAreaText);
                    putIn($('#pgbld .q4'), constructionTypeText);
                    putIn($('#pgbld .q7'), occupAddText);
                    if (occupRows.length > 0) {
                        putIn($('#pgbld .q6'), "<table id=\"occupTable\"><tr><th>Occupancy type:</th><th>Construction type:</th><th>Area (sq. ft.):</th></tr></table>");
                        for (let i = 0; i < occupRows.length; i += 3) {
                            $('#occupTable').append("<tr><td>" + occupRows[i] + "</td><td>" + occupRows[i + 1] + "</td><td>" + occupRows[i + 2] + "</td></tr>");
                        }
                    } else {
                        takeOut($('#pgbld .q6'));
                    }
                    $('#occupAdd').click(function() {
                        if ($('#occupCat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0) {
                            occupRows.push($('#occupCat').val(), $('#constructionType').val(), $('#cnArea').val());
                            if ($('#units').val()) {
                                numUnits += parseInt($('#units').val());
                            }
                            putIn($('#pgbld .q6'), "<table id=\"occupTable\"><tr><th>Occupancy type:</th><th>Construction type:</th><th>Area (sq. ft.):</th></tr></table>");
                            for (let i = 0; i < occupRows.length; i += 3) {
                                $('#occupTable').append("<tr><td>" + occupRows[i] + "</td><td>" + occupRows[i + 1] + "</td><td>" + occupRows[i + 2] + "</td></tr>");
                            }
                            $('#occupCat').val('');
                            putIn($('#pgbld .q3'), cnAreaText);
                            putIn($('#pgbld .q4'), constructionTypeText);
                            takeOut($('#pgbld .q5'));
                        } else {
                            showError($(this), $('#occupCat, #cnArea, #constructionType, #pgbld .q4 input'));
                        }
                    });
                });
            } else if (projectType == "RB") {
                putIn($('#pgbld .q2'), structureTypeText);
                putIn($('#pgbld .q7'), remodelCostText);
                $('#pgbld .q2 select').change(function() {
                    takeOut($('#pgbld .q4, #pgbld .q5, #pgbld .q6'));
                    if ($(this).val() == "a single family home" || $(this).val() == "a duplex") {
                        putIn($('#pgbld .q3'), livingSpaceText);
                    } else if ($(this).val() == "an accessory structure") {
                        putIn($('#pgbld .q3'), accessoryText);
                    }
                    $('#garageCheck').change(function() {
                        if ($(this).is(':checked')) {
                            putIn($('#pgbld .q4'), garageAreaText);
                        } else {
                            takeOut($('#pgbld .q4'));
                        }
                    });
                    $('#carportCheck').change(function() {
                        if ($(this).is(':checked')) {
                            putIn($('#pgbld .q5'), carportAreaText);
                        } else {
                            takeOut($('#pgbld .q5'));
                        }
                    });
                    $('#otherCheck').change(function() {
                        if ($(this).is(':checked')) {
                            putIn($('#pgbld .q6'), otherAreaText);
                        } else {
                            takeOut($('#pgbld .q6'));
                        }
                    });
                });
            } else if (projectType == "CB") {
                putIn($('#pgbld .q2'), `<h4>Addition:</h4>` + occupCatText);
                putIn($('#pgbld .q3'), cnAreaText);
                putIn($('#pgbld .q4'), constructionTypeText);
                putIn($('#pgbld .q7'), occupAddText);
                putIn($('#pgbld .q8'), `<h4>Remodel:</h4>` + remodelCostText);
                takeOut($('#pgbld .q5, #pgbld .q6'));
                // $("#pgbld .q3").insertBefore();
                // $("#pgbld .q8").insertBefore(`<h4>Remodel:</h4>`);
                $('#occupCat').change(function() {
                    if ($(this).val().match("^R")) {
                        putIn($('#pgbld .q5'), unitsText);
                    } else {
                        takeOut($('#pgbld .q5'));
                    }
                    putIn($('#pgbld .q3'), cnAreaText);
                    putIn($('#pgbld .q4'), constructionTypeText);
                    putIn($('#pgbld .q7'), occupAddText);
                    if (occupRows.length > 0) {
                        putIn($('#pgbld .q6'), "<table id=\"occupTable\"></table>");
                        $('#occupTable').html("<tr><th>Occupancy type:</th><th>Construction type:</th><th>Area (sq. ft.):</th></tr>");
                        for (let i = 0; i < occupRows.length; i += 3) {
                            $('#occupTable').append("<tr><td>" + occupRows[i] + "</td><td>" + occupRows[i + 1] + "</td><td>" + occupRows[i + 2] + "</td></tr>");
                        }
                    } else {
                        takeOut($('#pgbld .q5'));
                    }
                    $('#occupAdd').click(function() {
                        if ($('#occupCat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0) {
                            occupRows.push($('#occupCat').val(), $('#constructionType').val(), $('#cnArea').val());
                            numUnits += parseInt($('#units').val());
                            putIn($('#pgbld .q6'), "<table id=\"occupTable\"></table>");
                            $('#occupTable').html("<tr><th>Occupancy type:</th><th>Construction type:</th><th>Area (sq. ft.):</th></tr>");
                            for (let i = 0; i < occupRows.length; i += 3) {
                                $('#occupTable').append("<tr><td>" + occupRows[i] + "</td><td>" + occupRows[i + 1] + "</td><td>" + occupRows[i + 2] + "</td></tr>");
                            }
                            $('#occupCat').val('');
                            putIn($('#pgbld .q3'), cnAreaText);
                            putIn($('#pgbld .q4'), constructionTypeText);
                            takeOut($('#pgbld .q5'));
                        } else {
                            showError($(this), $('#occupCat, #cnArea, #constructionType, #pgbld .q4 input'));
                        }
                    });
                });
            }
        }
    });
}

function wtrPermit() {
    $('#pgwtr .question').hide();
    putIn($('#pgwtr h3'), "Water");
    putIn($('#pgwtr .q1'), waterConnectionTypeText);
    putIn($('#pgwtr .q2'), rowRestorationText);
    putIn($('#pgwtr .q3'), barricadeIfText);
    $('.barricadeIf').change(function() {
        if ($(this).val() == "will") {
            putIn($('#pgwtr .q4'), barricadeDaysText);
        } else {
            takeOut($('#pgwtr .q4'));
        }
    });
}

function plmPermit() {
    $('#pgplm .question').hide();
    putIn($('#pgplm h3'), "Plumbing");
    putIn($('#pgplm .q1'), plmTypeText);
    $('.plmProjectType').change(function() {
        if ($(this).val() == "residential") {
            putIn($('#pgplm .q2'), plmEstimationText);
        } else if ($(this).val() == "commercial") {
            putIn($('#pgplm .q2'), plmFixtureText);
        } else {
            takeOut($('#pgplm .q2'));
        }
    });
}

function mechPermit() {
    $('#pgmech .question').hide();
    putIn($('#pgmech h3'), "Residential Mechanical");
    putIn($('#pgmech .q1'), mechValuationText);
}

function stormPermit() {
    $('#pgstorm .question').hide();
    putIn($('#pgstorm h3'), "Surfacewater");
    putIn($('#pgstorm .q1'), dischargePointText);
    putIn($('#pgstorm .q2'), rowRestorationText);
    putIn($('#pgstorm .q3'), barricadeDaysText);
    // $('.rowRestoration').change(function() {
    //     if ($(this).val() == "will") {
    //     } else {
    //         takeOut($('#pgstorm .q3'));
    //     }
    // });
}

function sewerPermit() {
    $('#pgsewer .question').hide();
    putIn($('#pgsewer h3'), "Wastewater");
    putIn($('#pgsewer .q1'), sewerConnectionTypeText);
    putIn($('#pgsewer .q2'), rowRestorationText);
    putIn($('#pgsewer .q3'), barricadeDaysText);
}

function sitedevPermit() {
    $('#pgsitedev .question').hide();
    putIn($('#pgsitedev h3'), "Site Development");
    putIn($('#pgsitedev .q1'), sdevFeeText);
}

function woPermit() {
    $('#pgwo .question').hide();
    putIn($('#pgwo h3'), "Work Order");
    putIn($('#pgwo .q1'), woFeeText);
}

function signPermit() {
    $('#pgsign .question').hide();
    putIn($('#pgsign h3'), "Sign");
    putIn($('#pgsign .q1'), signCostText);

    putIn($('#pgsign .q2'), barricadeIfText);
    $('#pgsign .barricadeIf').change(function() {
        if ($(this).val() == "will") {
            putIn($('#pgsign .q3'), barricadeDaysText);
        } else {
            takeOut($('#pgsign .q3'));
        }
    });
}

function demoPermit() {
    $('#pgdemo .question').hide();
    putIn($('#pgdemo h3'), "Demolition");
    putIn($('#pgdemo .q1'), demoTypeText);
    $('#demoType').change(function() {
        $('#demoAcc').change(function() {
            if ($(this).val() == "is") {
                putIn($('#pgdemo .q3'), demoAccPlmText);
            } else {
                takeOut($('#pgdemo .q3'));
            }
        });
    });
}

function landPermit() {
    useRows = [];
    $('#pgland .question').hide();
    putIn($('#pgland h3'), "Land Use");
    putIn($('#pgland .q1'), luPermitTypeText);
    putIn($('#pgland .q5'), luAddText);
    
    $('#luPermitType').change(function() {
        if ($(this).val() == "" || $(this).val() == "major modification of permit" || $(this).val() == "open space use classification" || $(this).val() == "site approval" || $(this).val() == "site rezone/reclassification" || $(this).val() == "special development permit" || $(this).val() == "temporary homeless camp" || $(this).val() == "waiver") {
            takeOut($('#pgland .q2'));
        } else if ($(this).val() == "accessory dwelling unit") {
            putIn($('#pgland .q2'), "<p>The related subcategory is " + accDwellingSubtypeText + ".</p>");
        } else if ($(this).val() == "additional/expanded notice") {
            putIn($('#pgland .q2'), "<p>The related subcategory is " + addExpandSubtypeText + ".</p>");
        } else if ($(this).val() == "conditional use") {
            putIn($('#pgland .q2'), "<p>The related subcategory is " + condUseSubtypeText + ".</p>");
        } else if ($(this).val() == "critical areas") {
            putIn($('#pgland .q2'), "<p>The related subcategory is " + critAreaSubtypeText + ".</p>");
        } else if ($(this).val() == "development regulation agreement") {
            putIn($('#pgland .q2'), "<p>The related subcategory is " + DRASubtypeText + ".</p>");
        } else if ($(this).val() == "environmental review") {
            putIn($('#pgland .q2'), "<p>The related subcategory is " + envRevSubtypeText + ".</p>");
        } else if ($(this).val() == "information requests") {
            putIn($('#pgland .q2'), "<p>The related subcategory is " + infReqSubtypeText + ".</p>");
        } else if ($(this).val() == "plats / BLAs / segregations / combinations") {
            putIn($('#pgland .q2'), "<p>The related subcategory is " + platsSubtypeText + ".</p>");
        } else if ($(this).val() == "shoreline") {
            putIn($('#pgland .q2'), "<p>The related subcategory is " + shoreSubtypeText + ".</p>");
        } else if ($(this).val() == "variance") {
            putIn($('#pgland .q2'), "<p>The related subcategory is " + varSubtypeText + ".</p>");
        }
        takeOut($('#pgland .q3'));
        $('#luPermitSubtype').change(function() {
            var pType = $('#luPermitType').val();
            var type = $(this).val();

            if (type == 'GIS drafting (New Plats)' || type == 'GIS drafting (New Short Plat or BLA)') {
                // GIS Drafting
                putIn($('#pgland .q3'), plats3rdQuestText);
                $('#thirdQuest').change(function() {
                    lots = $(this).val();
                });
            } else if (type == 'E-Vault scanning and indexing') {
                // E-Vault
                putIn($('#pgland .q3'), pages3rdQuestText);
                $('#thirdQuest').change(function() {
                    pages = $(this).val();
                });
            } else if (pType == 'shoreline' && type == 'other') {
                // Shoreline Other
                putIn($('#pgland .q3'), shore3rdQuestText);
                $('#thirdQuest').change(function() {
                    shoreval = $(this).val();
                });
            } else {
                takeOut($('#pgland .q3'));
            }
        });
    });
    $('#luAdd').click(function() {
        var addToTable = false;
        if ($('#luPermitType').val() != "" && $('#luPermitSubtype').val() != "") {
            useRows.push($('#luPermitType').val());
            useRows.push($('#luPermitSubtype').val());
            addToTable = true;
        } else if ($('#luPermitType').val() == "" || $('#luPermitSubtype').val() == "") {
            addToTable = false;
            showError($(this), $('#luPermitType, #luPermitSubtype, #pgland .q3 input'));
        }
        if (addToTable) {
            putIn($('#pgland .q4'), "<table id=\"useTable\"><tr><th>Use type:</th><th>Subtype:</th></tr></table>");
            for (i = 0; i < useRows.length; i += 2) {
                $('#useTable').append("<tr><td>" + useRows[i] + "</td><td>" + useRows[i + 1] + "</td></tr>");
            }
            $('#luPermitType').val('');
            takeOut($('#pgland .q2, #pgland .q3'));
        }
    });
}

function firePermit() {
    $('#pgfire .question').hide();
    putIn($('#pgfire h3'), "Fire");
    putIn($('#pgfire .q1'), fireCategoriesText);
    $('#fireCategories').change(function() {
        if ($(this).val() == "fire alarms") {
            putIn($('#pgfire .q2'), fireAlarmText);
        } else if ($(this).val() == "pre-engineered systems") {
            putIn($('#pgfire .q2'), firePreEngText);
        } else if ($(this).val() == "kitchen hood suppression systems") {
            putIn($('#pgfire .q2'), fireKitchenText);
        } else if ($(this).val() == "private fire service mains and their appurtenances") {
            putIn($('#pgfire .q2'), fireServMainsText);
        } else if ($(this).val() == "fire sprinkler tenant improvement") {
            putIn($('#pgfire .q2'), fireSprinklerText);
        } else if ($(this).val() == "underground fire systems") {
            putIn($('#pgfire .q2'), fireUnderground);
        } else if ($(this).val() == "new water based fire suppression systems") {
            putIn($('#pgfire .q2'), fireSuppressionText);
        } else {
            takeOut($('#pgfire .q2'));
        }
    });
}

function eventPermit() {
    $('#pgevent .question').hide();
    putIn($('#pgevent h3'), "Special Event");
    putIn($('#pgevent .q1'), eventTypeText);
    putIn($('#pgevent .q2'), eventBlockText);
    putIn($('#pgevent .q3'), eventDateText);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    today = yyyy + "-" + mm + "-" + dd;
    $('input[type="date"]').attr("min", today);
}

function prePermit() {
    $('#pgpre .question').hide();
    putIn($('#pgpre h3'), "Pre-Development Services");
    putIn($('#pgpre .q1'), preTypeText);
}

function rowPermit() {
    $('#pgrow .question').hide();
    putIn($('#pgrow h3'), "Right-of-Way");
    putIn($('#pgrow .q1'), rowTypeText);
    $('#rowType').change(function() {
        takeOut($('#pgrow .q4, #pgrow .q5, #pgrow .q6, #pgrow .q7, #pgrow .q8, #pgrow .q9, #pgrow .q10, #pgrow .q11'));
        // Show additional ROCON HTML
        if ($(this).val() == "construction within (RCON)") {
            putIn($('#pgrow .q2'), barricadeIfText);
            $('#pgrow .barricadeIf').change(function() {
                if ($(this).val() == "will") {
                    putIn($('#pgrow .q3'), barricadeDaysText);
                } else {
                    takeOut($('#pgrow .q3'));
                }
            });
            putIn($('#pgrow .q4'), rowConstructionTypeText);
            $('#rconSidewalk').change(function() {
                if ($(this).is(':checked')) {
                    putIn($('#pgrow .q5'), rowSidewalkWorkText);
                    putIn($('#pgrow .q6'), rowSidewalkSizeText);
                } else {
                    takeOut($('#pgrow .q5, #pgrow .q6'));
                }
            });
            $('#rconDriveway').change(function() {
                if ($(this).is(':checked')) {
                    putIn($('#pgrow .q7'), rowDrivewayNumText);
                } else {
                    takeOut($('#pgrow .q7'));
                }
            });
            $('#rconCurb').change(function() {
                if ($(this).is(':checked')) {
                    putIn($('#pgrow .q8'), rowGutterLengthText);
                } else {
                    takeOut($('#pgrow .q8'));
                }
            });
            $('#rconTrenchBore').change(function() {
                if ($(this).is(':checked')) {
                    putIn($('#pgrow .q9'), rowTrenchTypeText);
                    $('#rowTrenchType').change(function() {
                        if ($(this).val() == "an open cut trench") {
                            putIn($('#pgrow .q10'), rowTrenchLengthText);
                        } else if ($(this).val() == "a monitoring well, a bore, or potholing") {
                            putIn($('#pgrow .q10'), rowBoreCountText);
                        } else {
                            takeOut($('#pgrow .q10'));
                        }
                    });
                } else {
                    takeOut($('#pgrow .q9, #pgrow .q10'));
                }
            });
            $('#addPaveArea').change(function() {
                if ($(this).is(':checked')) {
                    putIn($('#pgrow .q11'), rowPavingText);
                } else {
                    takeOut($('#pgrow .q11'));
                }
            })
        }
        // Show additional ROCC HTML
        else if ($(this).val() == "occupancy of (ROCC)") {
            takeOut($('#pgrow .q2'));
            putIn($('#pgrow .q4'), rowOccupancyText);
            $('#rowOcc').change(function() {
                takeOut($('#pgrow .q5, #pgrow .q6'));
                if ($(this).val() == "ground water monitoring well") {
                    putIn($('#pgrow .q5'), rowOccWellText);
                }
            });
        }
        // Show additional ROWUSE HTML
        else if ($(this).val() == "use of (RUSE)") {
            putIn($('#pgrow .q2'), barricadeIfText);
            $('#pgrow .barricadeIf').change(function() {
                if ($(this).val() == "will") {
                    putIn($('#pgrow .q3'), barricadeDaysText);
                } else {
                    takeOut($('#pgrow .q3'));
                }
            });
            putIn($('#pgrow .q4'), rowUseTypeText);
            putIn($('#pgrow .q7'), rowHoliday);
            $('#rowUse').change(function() {
                takeOut($('#pgrow .q5, #pgrow .q6'));
                if ($(this).val() == "a special motor vehicle") {
                    putIn($('#pgrow .q5'), rowSMVTypeText);
                } else if ($(this).val() == "overtime parking") {
                    putIn($('#pgrow .q5'), rowUseDaysText);
                } else if ($(this).val() == "a banner") {
                    putIn($('#pgrow .q5'), rowBannerBlocksText);
                    putIn($('#pgrow .q6'), rowBannerInstallText);
                }
            });
        } else if ($(this).val() == "utility work in (RUTI)") {
            putIn($('#pgrow .q2'), barricadeIfText);
            $('#pgrow .barricadeIf').change(function() {
                if ($(this).val() == "will") {
                    putIn($('#pgrow .q3'), barricadeDaysText);
                } else {
                    takeOut($('#pgrow .q3'));
                }
            });
            putIn($('#pgrow .q4'), rowTrenchText);
            $('#rowTrench').change(function() {
                if ($(this).val() == "will") {
                    putIn($('#pgrow .q5'), rowTrenchLengthText);
                } else {
                    takeOut($('#pgrow .q5'));
                }
            });
            putIn($('#pgrow .q6'), rowBoresText);
            $('#rowBores').change(function() {
                if ($(this).val() == "will") {
                    putIn($('#pgrow .q7'), rowBoreCountText);
                } else {
                    takeOut($('#pgrow .q7'));
                }
            });
        }
    });
}

function back() {
    if ($('.question-box.active').attr('id') == "pglast") {
        readyForLastPage = false;
        currentPermit = permits[permits.length - 1];
        $('#pgmid-pointer').removeClass('post');
        $('.description').removeClass('open').removeClass('disclaimer').html(pg1and2instructions);
        $('#pglast, .tab-links li').removeClass('active');
        $('#pg' + currentPermit + ', #pgmid-pointer').addClass('active');
    } else if ($('.question-box.active').attr('id') == "pgbld") {
        backPermit("bld");
    } else if ($('.question-box.active').attr('id') == "pgplm") {
        backPermit("plm");
    } else if ($('.question-box.active').attr('id') == "pgmech") {
        backPermit("mech");
    } else if ($('.question-box.active').attr('id') == "pgsewer") {
        backPermit("sewer");
    } else if ($('.question-box.active').attr('id') == "pgwtr") {
        backPermit("wtr");
    } else if ($('.question-box.active').attr('id') == "pgstorm") {
        backPermit("storm");
    } else if ($('.question-box.active').attr('id') == "pgsitedev") {
        backPermit("sitedev");
    } else if ($('.question-box.active').attr('id') == "pgwo") {
        backPermit("wo");
    } else if ($('.question-box.active').attr('id') == "pgsign") {
        backPermit("sign");
    } else if ($('.question-box.active').attr('id') == "pgdemo") {
        backPermit("demo");
    } else if ($('.question-box.active').attr('id') == "pgland") {
        backPermit("land");
    } else if ($('.question-box.active').attr('id') == "pgfire") {
        backPermit("fire");
    } else if ($('.question-box.active').attr('id') == "pgevent") {
        backPermit("event");
    } else if ($('.question-box.active').attr('id') == "pgrow") {
        backPermit("row");
    } else if ($('.question-box.active').attr('id') == "pgpre") {
        backPermit("pre");
    }

    occupRows = [];
}

function next() {
    if ($('.question-box.active').attr('id') == "pgbld") {
        bldPageNext();
    } else if ($('.question-box.active').attr('id') == "pgplm") {
        plmPageNext();
    } else if ($('.question-box.active').attr('id') == "pgmech") {
        mechPageNext();
    } else if ($('.question-box.active').attr('id') == "pgsewer") {
        sewerPageNext();
    } else if ($('.question-box.active').attr('id') == "pgwtr") {
        wtrPageNext();
    } else if ($('.question-box.active').attr('id') == "pgstorm") {
        stormPageNext();
    } else if ($('.question-box.active').attr('id') == "pgsitedev") {
        sitePageNext();
    } else if ($('.question-box.active').attr('id') == "pgwo") {
        woPageNext();
    } else if ($('.question-box.active').attr('id') == "pgsign") {
        signPageNext();
    } else if ($('.question-box.active').attr('id') == "pgdemo") {
        demoPageNext();
    } else if ($('.question-box.active').attr('id') == "pgland") {
        landPageNext();
    } else if ($('.question-box.active').attr('id') == "pgfire") {
        firePageNext();
    } else if ($('.question-box.active').attr('id') == "pgevent") {
        eventPageNext();
    } else if ($('.question-box.active').attr('id') == "pgrow") {
        rowPageNext();
    } else if ($('.question-box.active').attr('id') == "pgpre") {
        prePageNext();
    } else if ($('.question-box.active').attr('id') == "pgfirst") {
        firstPageNext();
    } else if ($('.question-box.active').attr('id') == "pglast") {
        lastPageNext();
    }
}

function firstPageNext() {
    permits = [];
    if ($('#bldCheck').is(':checked')) {
        permits.push("bld");
    }
    if ($('#plmCheck').is(':checked')) {
        permits.push("plm");
    }
    if ($('#mechCheck').is(':checked')) {
        permits.push("mech");
    }
    if ($('#sewerCheck').is(':checked')) {
        permits.push("sewer");
    }
    if ($('#wtrCheck').is(':checked')) {
        permits.push("wtr");
    }
    if ($('#stormCheck').is(':checked')) {
        permits.push("storm");
    }
    if ($('#sitedevCheck').is(':checked')) {
        permits.push("sitedev");
    }
    if ($('#woCheck').is(':checked')) {
        permits.push("wo");
    }
    if ($('#signCheck').is(':checked')) {
        permits.push("sign");
    }
    if ($('#demoCheck').is(':checked')) {
        permits.push("demo");
    }
    if ($('#landCheck').is(':checked')) {
        permits.push("land");
    }
    if ($('#fireCheck').is(':checked')) {
        permits.push("fire");
    }
    if ($('#eventCheck').is(':checked')) {
        permits.push("event");
    }
    if ($('#rowCheck').is(':checked')) {
        permits.push("row");
    }
    if ($('#preCheck').is(':checked')) {
        permits.push("pre");
    }
    if ($('input[type="checkbox"]').is(':checked')) {
        $('.description').removeClass('open');
        $('#pgfirst, .tab-links li').removeClass('active');
        $('#pgfirst-pointer').addClass('post');
        $('#details-num').text(" (1/" + permits.length + ")");
        for (var i in permits) {
            if (i == 0) {
                activePermit = permits[i];
            }
            if (permits[i] == "bld") {
                $('<article id=\"pgbld\" class=\"question-box\"></article>').insertBefore('#pglast');
                $('#pgbld').html(basicPage);
                $('#pgmid-pointer').addClass('active');
                $('#pgbld .question').hide();
            } else if (permits[i] == "plm") {
                $('<article id=\"pgplm\" class=\"question-box\"></article>').insertBefore('#pglast');
                $('#pgplm').html(basicPage);
                $('#pgmid-pointer').addClass('active');
                $('#pgplm .question').hide();
            } else if (permits[i] == "mech") {
                $('<article id=\"pgmech\" class=\"question-box\"></article>').insertBefore('#pglast');
                $('#pgmech').html(basicPage);
                $('#pgmid-pointer').addClass('active');
                $('#pgmech .question').hide();
            } else if (permits[i] == "sewer") {
                $('<article id=\"pgsewer\" class=\"question-box\"></article>').insertBefore('#pglast');
                $('#pgsewer').html(basicPage);
                $('#pgmid-pointer').addClass('active');
                $('#pgsewer .question').hide();
            } else if (permits[i] == "wtr") {
                $('<article id=\"pgwtr\" class=\"question-box\"></article>').insertBefore('#pglast');
                $('#pgwtr').html(basicPage);
                $('#pgmid-pointer').addClass('active');
                $('#pgwtr .question').hide();
            } else if (permits[i] == "storm") {
                $('<article id=\"pgstorm\" class=\"question-box\"></article>').insertBefore('#pglast');
                $('#pgstorm').html(basicPage);
                $('#pgmid-pointer').addClass('active');
                $('#pgstorm .question').hide();
            } else if (permits[i] == "sitedev") {
                $('<article id=\"pgsitedev\" class=\"question-box\"></article>').insertBefore('#pglast');
                $('#pgsitedev').html(basicPage);
                $('#pgmid-pointer').addClass('active');
                $('#pgsitedev .question').hide();
            } else if (permits[i] == "wo") {
                $('<article id=\"pgwo\" class=\"question-box\"></article>').insertBefore('#pglast');
                $('#pgwo').html(basicPage);
                $('#pgmid-pointer').addClass('active');
                $('#pgwo .question').hide();
            } else if (permits[i] == "sign") {
                $('<article id=\"pgsign\" class=\"question-box\"></article>').insertBefore('#pglast');
                $('#pgsign').html(basicPage);
                $('#pgmid-pointer').addClass('active');
                $('#pgsign .question').hide();
            } else if (permits[i] == "demo") {
                $('<article id=\"pgdemo\" class=\"question-box\"></article>').insertBefore('#pglast');
                $('#pgdemo').html(basicPage);
                $('#pgmid-pointer').addClass('active');
                $('#pgdemo .question').hide();
            } else if (permits[i] == "land") {
                $('<article id=\"pgland\" class=\"question-box\"></article>').insertBefore('#pglast');
                $('#pgland').html(basicPage);
                $('#pgmid-pointer').addClass('active');
                $('#pgland .question').hide();
            } else if (permits[i] == "fire") {
                $('<article id=\"pgfire\" class=\"question-box\"></article>').insertBefore('#pglast');
                $('#pgfire').html(basicPage);
                $('#pgmid-pointer').addClass('active');
                $('#pgfire .question').hide();
            } else if (permits[i] == "event") {
                $('<article id=\"pgevent\" class=\"question-box\"></article>').insertBefore('#pglast');
                $('#pgevent').html(basicPage);
                $('#pgmid-pointer').addClass('active');
                $('#pgevent .question').hide();
            } else if (permits[i] == "row") {
                $('<article id=\"pgrow\" class=\"question-box\"></article>').insertBefore('#pglast');
                $('#pgrow').html(basicPage);
                $('#pgmid-pointer').addClass('active');
                $('#pgrow .question').hide();
            } else if (permits[i] == "pre") {
                $('<article id=\"pgpre\" class=\"question-box\"></article>').insertBefore('#pglast');
                $('#pgpre').html(basicPage);
                $('#pgpre-pointer').addClass('active');
                $('#pgpre .question').hide();
            }
        }
        if (activePermit == "bld") {
            $('#pgbld').addClass('active');
            bldPermit();
        } else if (activePermit == "plm") {
            $('#pgplm').addClass('active');
            plmPermit();
        } else if (activePermit == "mech") {
            $('#pgmech').addClass('active');
            mechPermit();
        } else if (activePermit == "sewer") {
            $('#pgsewer').addClass('active');
            sewerPermit();
        } else if (activePermit == "wtr") {
            $('#pgwtr').addClass('active');
            wtrPermit();
        } else if (activePermit == "storm") {
            $('#pgstorm').addClass('active');
            stormPermit();
        } else if (activePermit == "sitedev") {
            $('#pgsitedev').addClass('active');
            sitedevPermit();
        } else if (activePermit == "wo") {
            $('#pgwo').addClass('active');
            woPermit();
        } else if (activePermit == "sign") {
            $('#pgsign').addClass('active');
            signPermit();
        } else if (activePermit == "demo") {
            $('#pgdemo').addClass('active');
            demoPermit();
        } else if (activePermit == "land") {
            $('#pgland').addClass('active');
            landPermit();
        } else if (activePermit == "fire") {
            $('#pgfire').addClass('active');
            firePermit();
        } else if (activePermit == "event") {
            $('#pgevent').addClass('active');
            eventPermit();
        } else if (activePermit == "row") {
            $('#pgrow').addClass('active');
            rowPermit();
        } else if (activePermit == "pre") {
            $('#pgpre').addClass('active');
            prePermit();
        }
    } else {
        showError($(this), $('#pgfirst input'));
    }
}

function bldPageNext() {
    readyforNextPage = false;
    if (projectType == "RN" || projectType == "RA") {
        if ($('#structureType').val() == "a single family home" || $('#structureType').val() == "a duplex") {
            $.each($('#pgbld .q3 input'), function() {
                if ($(this).val()) {
                    readyforNextPage = true;
                }
            });
        } else if ($('#structureType').val() == "an accessory structure") {
            if ($('#garageCheck').is(':checked') && $('#garageArea').val() > 0) {
                readyforNextPage = true;
            }
            if ($('#carportCheck').is(':checked') && $('#carportArea').val() > 0) {
                readyforNextPage = true;
            }
            if ($('#otherCheck').is(':checked') && $('#otherArea').val() > 0) {
                readyforNextPage = true;
            }
        }
        if (readyforNextPage) {
            structureType = $('#structureType').val();
            livingSpaceArea = $('#livingSpaceArea').val();
            garageArea = $('#garageArea').val();
            premanArea = $('#premanArea').val();
            basementArea = $('#basementArea').val();
            deckArea = $('#deckArea').val();
        } else {
            showError($('#pgbld .next'), $('#pgbld input, #pgbld select'));
        }
    } else if (projectType == "RR" || projectType == "CR") {
        if ($('#remodelCost').val()) {
            readyforNextPage = true;
        } else {
            showError($('#pgbld .next'), $('#pgbld input, #pgbld select'));
        }
        if (readyforNextPage) {
            remodelCost = $('#remodelCost').val();
        }
    } else if (projectType == "CN" || projectType == "CA") {
        if ($('#pgbld input, #pgbld select').val()) {
            numUnits += parseInt($('#units').val());
            if (occupRows.length > 0) {
                if ($('#occupCat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0) {
                    occupRows.push($('#occupCat').val(), $('#constructionType').val(), $('#cnArea').val());
                }
                readyforNextPage = true;
            } else if (occupRows.length == 0 && $('#occupCat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0) {
                occupRows.push($('#occupCat').val(), $('#constructionType').val(), $('#cnArea').val());
                readyforNextPage = true;
            }
        } else {
            showError($('#pgbld .next'), $('#pgbld input, #pgbld select'));
        }
    } else if (projectType == "RB") {
        if ($('#remodelCost').val()) {
            if ($('#structureType').val() == "a single family home" || $('#structureType').val() == "a duplex") {
                $.each($('#pgbld .q3 input'), function() {
                    if ($(this).val()) {
                        readyforNextPage = true;
                    }
                });
            } else if ($('#structureType').val() == "an accessory structure") {
                if ($('#garageCheck').is(':checked') && $('#garageArea').val() > 0) {
                    readyforNextPage = true;
                }
                if ($('#carportCheck').is(':checked') && $('#carportArea').val() > 0) {
                    readyforNextPage = true;
                }
                if ($('#otherCheck').is(':checked') && $('#otherArea').val() > 0) {
                    readyforNextPage = true;
                }
            }
        }
        if (readyforNextPage) {
            structureType = $('#structureType').val();
            livingSpaceArea = $('#livingSpaceArea').val();
            garageArea = $('#garageArea').val();
            premanArea = $('#premanArea').val();
            basementArea = $('#basementArea').val();
            deckArea = $('#deckArea').val();
        } else {
            showError($('#pgbld .next'), $('#pgbld input, #pgmid select'));
        }
    } else if (projectType == "CB") {
        if ($('#pgbld input, #pgbld select').val()) {
            if ($('#remodelCost').val()) {
                numUnits += parseInt($('#units').val());
                if (occupRows.length > 0) {
                    if ($('#occupCat').val() != "" && $('#constructionType').val() != "" && $('#cnArea').val() > 0) {
                        occupRows.push($('#occupCat').val(), $('#constructionType').val(), $('#cnArea').val());
                    }
                    readyforNextPage = true;
                } else if (occupRows.length == 0 && $('#occupCat').val() != "" && $('#constructionType').val() != "") {
                    occupRows.push($('#occupCat').val(), $('#constructionType').val(), $('#cnArea').val());
                    readyforNextPage = true;
                }
            } else {
                showError($('#pgbld .next'), $('#pgbld input, #pgbld select'));
            }
        } else {
            showError($('#pgbld .next'), $('#pgbld input, #pgbld select'));
        }
    }
    if (readyforNextPage) {
        if (permits[permits.length - 1] == "bld") {
            finalPage();
        } else {
            currentPermit = permits[$.inArray("bld", permits) + 1];
            $('#pgbld').removeClass('active');
            $('#pg' + currentPermit).addClass('active');
            nextPermit(currentPermit);
        }
    }
}

function wtrPageNext() {
    if ($('#pgwtr .barricadeIf').val() == "will") {
        if ($('#pgwtr .daysForBarricade').val() > 0 && $('#pgwtr .connectionType').val()) {
            readyforNextPage = true;
        } else {
            showError($('#pgwtr .next'), $('#pgwtr .daysForBarricade, #pgwtr .connectionType'));
        }
    } else if ($('#pgwtr .barricadeIf').val() == "will not" && $('#pgwtr .connectionType').val() != "") {
        readyforNextPage = true;
    } else {
        showError($('#pgwtr .next'), $('#pgwtr .daysForBarricade, #pgwtr .connectionType'));
    }
    if (readyforNextPage) {
        if (permits[permits.length - 1] == "wtr") {
            finalPage();
        } else {
            currentPermit = permits[$.inArray("wtr", permits) + 1];
            $('#pgwtr').removeClass('active');
            $('#pg' + currentPermit).addClass('active');
            nextPermit(currentPermit);
        }
    }
}

function plmPageNext() {
    readyforNextPage = false;
    if ($('.plmProjectType').val() == 'residential') {
        if ($('#pgplm .plmValuation').val() > 0) {
            readyforNextPage = true;
        } else {
            putIn($('#pgplm .q3'), warningText);
        }
    } else if ($('.plmProjectType').val() == 'commercial') {
        if ($('#pgplm .fixtureQuantity').val() > 0) {
            readyforNextPage = true;
        } else {
            putIn($('#pgplm .q3'), warningText);
        }
    } else {
        putIn($('#pgplm .q3'), warningText);
    }

    if (readyforNextPage) {
        if (permits[permits.length - 1] == "plm") {
            finalPage();
        } else {
            currentPermit = permits[$.inArray("plm", permits) + 1];
            $('#pgplm').removeClass('active');
            $('#pg' + currentPermit).addClass('active');
            nextPermit(currentPermit);
        }
    } else {
        console.log("You are not ready for the next page");
    }
}

function mechPageNext() {
    readyforNextPage = false;
    if ($('.mechValuation').val() > 0) {
        readyforNextPage = true;
    } else {
        putIn($('#pgplm .q3'), warningText);
    }

    if (readyforNextPage) {
        if (permits[permits.length - 1] == "mech") {
            finalPage();
        } else {
            currentPermit = permits[$.inArray("mech", permits) + 1];
            $('#pgmech').removeClass('active');
            $('#pg' + currentPermit).addClass('active');
            nextPermit(currentPermit);
        }
    } else {
        console.log("You are not ready for the next page");
    }
}

function stormPageNext() {
    if ($('#pgstorm .rowRestoration').val() == "will") {
        if ($('#pgstorm .daysForBarricade').val() > 0 && $('#pgstorm .dischargePoint').val()) {
            readyforNextPage = true;
        }
    } else if ($('#pgstorm .rowRestoration').val() == "will not" && $('#pgstorm .dischargePoint').val() != "") {
        readyforNextPage = true;
    } else {
        showError($('#pgstorm .next'), $('#pgstorm input'));
    }
    if (readyforNextPage) {
        if (permits[permits.length - 1] == "storm") {
            finalPage();
        } else {
            currentPermit = permits[$.inArray("storm", permits) + 1];
            $('#pgstorm').removeClass('active');
            $('#pg' + currentPermit).addClass('active');
            nextPermit(currentPermit);
        }
    }
}

function sewerPageNext() {
    if ($('#pgsewer .rowRestoration').val() == "will") {
        if ($('#pgsewer .daysForBarricade').val() > 0 && $('#pgsewer .connectionType').val()) {
            readyforNextPage = true;
        }
    } else if ($('#pgsewer .rowRestoration').val() == "will not" && $('#pgsewer .connectionType').val() != "") {
        readyforNextPage = true;
    } else {
        showError($('#pgsewer .next'), $('#pgsewer input, #pgsewer select'));
    }
    if (readyforNextPage) {
        if (permits[permits.length - 1] == "sewer") {
            finalPage();
        } else {
            currentPermit = permits[$.inArray("sewer", permits) + 1];
            $('#pgsewer').removeClass('active');
            $('#pg' + currentPermit).addClass('active');
            nextPermit(currentPermit);
        }
    }
}

function sitePageNext() {
    readyforNextPage = false;
    if ($('#gradingArea').val() != "" && $('#hardSurfaceArea').val() != "" && $('#disturbedArea').val() != "") {
        if (permits[permits.length - 1] == "sitedev") {
            finalPage();
        } else {
            currentPermit = permits[$.inArray("sitedev", permits) + 1];
            $('#pgsitedev').removeClass('active');
            $('#pg' + currentPermit).addClass('active');
            nextPermit(currentPermit);
        }
    } else {
        showError($('#pgsitedev .next'), $('#pgsitedev input'));
    }
}

function woPageNext() {
    if (permits[permits.length - 1] == "wo") {
        finalPage();
    } else {
        currentPermit = permits[$.inArray("wo", permits) + 1];
        $('#pgwo').removeClass('active');
        $('#pg' + currentPermit).addClass('active');
        nextPermit(currentPermit);
    }
}

function signPageNext() {
    if ($('#signCost').val()) {
        if (permits[permits.length - 1] == "sign") {
            finalPage();
        } else {
            currentPermit = permits[$.inArray("sign", permits) + 1];
            $('#pgsign').removeClass('active');
            $('#pg' + currentPermit).addClass('active');
            nextPermit(currentPermit);
        }
    } else {
        showError($('#pgsign .next'), $('#signCost'));
    }
}

function demoPageNext() {
    if ($('#pgdemo input, #pgdemo select').val()) {
        if (permits[permits.length - 1] == "demo") {
            finalPage();
        } else {
            currentPermit = permits[$.inArray("demo", permits) + 1];
            $('#pgdemo').removeClass('active');
            $('#pg' + currentPermit).addClass('active');
            nextPermit(currentPermit);
        }
    } else {
        showError($('#pgdemo .next'), $('#pgdemo input, #pgdemo select'));
    }
}

function landPageNext() {
    readyforNextPage = false;
    if ($('#pgland select').val()) {
        if ($('#luPermitType').val() == "extension of permit" || $('#luPermitType').val() == "site approval" || $('#luPermitType').val() == "temporary homeless camp") {
            useRows.push($('#luPermitType').val(), "");
            readyforNextPage = true;
        } else {
            useRows.push($('#luPermitType').val());
            useRows.push($('#luPermitSubtype').val());
            readyforNextPage = true;
        }
    } else if (useRows.length > 0) {
        readyforNextPage = true;
    }
    if ($('#pgland select').val() || useRows.length > 0) {
        if ($('#luPermitType').val() != "" && $('#luPermitSubtype').val() != "") {}
    }
    if (readyforNextPage) {
        if (permits[permits.length - 1] == "land") {
            finalPage();
        } else {
            currentPermit = permits[$.inArray("land", permits) + 1];
            $('#pgland').removeClass('active');
            $('#pg' + currentPermit).addClass('active');
            nextPermit(currentPermit);
        }
    } else {
        showError($('#pgland .next'), $('#pgland input, #pgland select'));
    }
}

function firePageNext() {
    if ($('#fireCategories').val()) {
        $.each($('#pgfire input'), function() {
            if ($(this).val() > 0) {
                readyforNextPage = true;
            }
        });
    }
    if ($('#fireCategories').val() == "smoke control systems") {
        readyforNextPage = true;
    }
    if (readyforNextPage) {
        if (permits[permits.length - 1] == "fire") {
            finalPage();
        } else {
            currentPermit = permits[$.inArray("fire", permits) + 1];
            $('#pgfire').removeClass('active');
            $('#pg' + currentPermit).addClass('active');
            nextPermit(currentPermit);
        }
    } else {
        showError($('#pgfire .next'), $('#pgfire input, #pgfire select'));
    }
}

function eventPageNext() {
    if ($('#eventOrgType').val() != "" && $('#eventBlocks').val() != "" && $('#eventDate').val() != "") {
        if (permits[permits.length - 1] == "event") {
            finalPage();
        } else {
            currentPermit = permits[$.inArray("event", permits) + 1];
            $('#pgevent').removeClass('active');
            $('#pg' + currentPermit).addClass('active');
            nextPermit(currentPermit);
        }
    } else {
        showError($('#pgevent .next'), $('#pgevent input, #pgevent select'));
    }
}

// Function:rowPageNext :: Validation!
function rowPageNext() {
    var flag = [];
    if ($('#pgrow .barricadeIf').val() == "will") {
        if ($('#pgrow .daysForBarricade').val() != "") {
            flag.push(true);
        } else {
            flag.push(false);
        }
    }
    if ($('#rowType').val() == "construction within (RCON)") {
        if ($('.barricadeIf').val() == "" && !$('#rconCurb').is(':checked') && !$('#reconSidewalk').is(':checked') && !$('#rconDriveway').is(':checked') && !$('#rconTranchBore').is(':checked') && !$('#addPaveArea').is(':checked')) {
            flag.push(false);
        }
        if ($('#rconSidewalk').is(':checked')) {
            if ($('#rowSidewalkWork').val() != "") {
                flag.push(true);
            } else {
                flag.push(false);
            }
            if ($('#rowSidewalkSize').val() != "") {
                flag.push(true);
            } else {
                flag.push(false);
            }
        }
        if ($('#rconDriveway').is(':checked')) {
            if ($('#rowDriveway').val() == "is") {
                if ($('#rowAsphaltDrivewayNum').val() != "" || $('#rowConcreteDrivewayNum').val() != "") {
                    flag.push(true);
                } else {
                    flag.push(false);
                }
            }
        }
        if ($('#rconCurb').is(':checked')) {
            if ($('#rowGutterLength').val() != "") {
                flag.push(true);
            } else {
                flag.push(false);
            }
        }
        if ($('#rconTrenchBore').is(':checked')) {
            if ($('#rowTrenchType').val() == "an open cut trench") {
                if ($('#rowTrenchLength').val() != "") {
                    flag.push(true);
                } else {
                    flag.push(false);
                }
            } else if ($('#rowTrenchType').val() == "a monitoring well, a bore,or potholing") {
                if ($('#rowBoreCount').val() != "") {
                    flag.push(true);
                } else {
                    flag.push(false);
                }
            }
        }
        if ($('#rowPaving').val() != "") {
            flag.push(true);
        } else {
            flag.push(false);
        }
    } else if ($('#rowType').val() == "occupancy of (ROCC)") {
        if ($('#rowOcc').val() == "ground water monitoring well") {
            if ($('#rowWell').val() != "") {
                flag.push(true);
            } else {
                flag.push(false);
            }
        }
    } else if ($('#rowType').val() == "use of (RUSE)") {
        if ($('#rowUse').val() == "a special motor vehicle") {
            if ($('#rowSMVType').val() != "") {
                flag.push(true);
            } else {
                flag.push(false);
            }
        } else if ($('#rowUse').val() == "overtime parking") {
            if ($('#rowUseDays').val() != "") {
                flag.push(true);
            } else {
                flag.push(false);
            }
        } else if ($('#rowUse').val() == "a banner") {
            if ($('#rowBanner').val() == "will") {
                if ($('#rowBannerBlocks').val() != "" && $('#rowBannerInstall').val() != "") {
                    flag.push(true);
                } else {
                    flag.push(false);
                }
            }
        }
    } else if ($('#rowType').val() == "utility work in (RUTI)") {
        if ($('#rowTrench').val() == "will") {
            if ($('#rowTrenchLength').val() != "") {
                flag.push(true);
            } else {
                flag.push(false);
            }
        }
        if ($('#rowBores').val() == "will") {
            if ($('#rowBoreCount').val() != "") {
                flag.push(true);
            } else {
                flag.push(false);
            }
        }
    } else {
        flag.push(false);
    }
    readyforNextPage = true;
    for (var i = 0; i < flag.length; i++) {
        if (flag[i] === false) {
            readyforNextPage = false;
            break;
        }
    }
    if (readyforNextPage) {
        if (permits[permits.length - 1] == "row") {
            finalPage();
        } else {
            currentPermit = permits[$.inArray("row", permits) + 1];
            $('#pgrow').removeClass('active');
            $('#pg' + currentPermit).addClass('active');
            nextPermit(currentPermit);
        }
    } else {
        showError($('#pgrow .next'), $('#pgrow input, #pgrow select'));
    }
}

function prePageNext() {
    if ($('#preOptionA').is(':checked') || $('#preOptionB').is(':checked')) {
        if (permits[permits.length - 1] == "pre") {
            finalPage();
        } else {
            currentPermit = permits[$.inArray("pre", permits) + 1];
            $('#pgpre').removeClass('active');
            $('#pg' + currentPermit).addClass('active');
            nextPermit(currentPermit);
        }
    } else {
        showError($('#pgpre .next'), $('#pgpre input, #pgpre select'));
    }
}

// Function:lastPageNext
function lastPageNext() {
    readyForLastPage = false;
    $('.description').addClass('open').removeClass('disclaimer').html(pg1and2instructions);
    $('#pglast, .tab-links li').removeClass('active').removeClass('post');
    $('#pgfirst, #pgfirst-pointer').addClass('active');
    $('#details-num').text("");
}

// Function finalPage
function finalPage() {
    $('.fee-details').html("");
    for (var i in permits) {
        if (permits[i] == "bld") {
            $('.fee-details').append("<section class=\"fee-item\" id=\"bldPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Building</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
        } else if (permits[i] == "wtr") {
            $('.fee-details').append("<section class=\"fee-item\" id=\"wtrPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Water</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
        } else if (permits[i] == "plm") {
            $('.fee-details').append("<section class=\"fee-item\" id=\"plmPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Plumbing</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
        } else if (permits[i] == "mech") {
            $('.fee-details').append("<section class=\"fee-item\" id=\"mechPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Mechanical</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
        } else if (permits[i] == "storm") {
            $('.fee-details').append("<section class=\"fee-item\" id=\"stormPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Surfacewater</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
        } else if (permits[i] == "wo") {
            $('.fee-details').append("<section class=\"fee-item\" id=\"woPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Work Order</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
        } else if (permits[i] == "sewer") {
            $('.fee-details').append("<section class=\"fee-item\" id=\"sewerPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Wastewater</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
        } else if (permits[i] == "sitedev") {
            $('.fee-details').append("<section class=\"fee-item\" id=\"sitedevPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Site Development</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
        } else if (permits[i] == "sign") {
            $('.fee-details').append("<section class=\"fee-item\" id=\"signPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Sign</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
        } else if (permits[i] == "demo") {
            $('.fee-details').append("<section class=\"fee-item\" id=\"demoPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Demolition</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
        } else if (permits[i] == "land") {
            $('.fee-details').append("<section class=\"fee-item\" id=\"landPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Land Use</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
        } else if (permits[i] == "fire") {
            $('.fee-details').append("<section class=\"fee-item\" id=\"firePermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Fire</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
        } else if (permits[i] == "event") {
            $('.fee-details').append("<section class=\"fee-item\" id=\"eventPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Special Events</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
        } else if (permits[i] == "row") {
            $('.fee-details').append("<section class=\"fee-item\" id=\"rowPermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Right-of-Way</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
        } else if (permits[i] == "pre") {
            $('.fee-details').append("<section class=\"fee-item\" id=\"prePermitFeeDetails\"><header><i class=\"fa fa-caret-right\" aria-hidden=\"true\"></i> <b class=\"permit-title\">Pre-Development Services</b><span class=\"money total\"></span></header>" + permitFeeDetails + "</section>");
        }
    }
    finalCalculation();
    $('#pgmid-pointer').addClass('post');
    $('.question-box, .tab-links li').removeClass('active');
    $('#pglast, #pglast-pointer').addClass('active');
    $('.description').addClass('open').addClass('disclaimer').html(pg3disclaimer);
}

function finalCalculation() {
    grandTotal = 0;
    for (var i in permits) {
        valuation = 0;
        permitFee = 0;
        planRevFee = 0;
        total = 0;
        annual = 0;
        useFee = 0;
        bonding = 0;
        barricade = 0;
        stateFee = 0;
        techFund = 0;
        emergencyFund = 0;
        resourceFund = 0;
        reserveFund = 0;
        siteFee = 0;
        sitePlanrev = 0;

        var fee = 0;

        if (permits[i] == "bld") {
            /* Building Commercial Calculations */
            // feeAssessBLDCN() feeAssessBLDCA()
            if (projectType1 == "C") {
                valuation = 0;
                for (var k = 0; k < occupRows.length; k += 3) {
                    valuation += occupRows[k + 2] * getBVD(occupRows[k + 1], occupRows[k]);
                }

                if ($('#remodelCost').val()) {
                    valuation += parseInt($('#remodelCost').val());
                }

                console.log("Code Calculated Valuation: " + valuation.toFixed(2));

                permitFee = BldPermitCalc(valuation.toFixed(2));
                planRevFee = CompPlanReviewCalc (permitFee);

                techFund = .05 * (permitFee + planRevFee);
                emergencyFund = .05 * (permitFee);
                resourceFund = .05 * (permitFee + planRevFee);
                reserveFund = .02 * (permitFee + planRevFee);
                stateFee = 25;
            }
            /* Building Residential Calculations */
            if (projectType1 == "R") {
                // feeAssessBLDRN()
                if (projectType == "RN") {
                    valuation = BldrnValuationAdjustment(
                      parseInt($('#livingSpaceArea').val()),
                      parseInt($('#veneerChoice').val()),
                      parseInt($('#carport').val()),
                      parseInt($('#deckArea').val()),
                      parseInt($('#premanArea').val()),
                      parseInt($('#garageArea').val()) + (parseInt($('#otherArea').val() || 0)),
                      0,
                      "VB",
                      "R-3 Residential, one- and two-family");

                    console.log("Code Calculated Valuation: " + valuation);
                    permitFee = .0131 * valuation;
                         
                    if (permitFee < 180) permitFee = 180;

                    planRevFee = .45 * permitFee;
                    siteFee = .65 * permitFee;
                    sitePlanrev = .45 * permitFee;
                    total = permitFee + planRevFee + siteFee + sitePlanrev;
                    techFund = .05 * total;
                    emergencyFund = .05 * (total - planRevFee - sitePlanrev);
                    resourceFund = .05 * total;
                    reserveFund = .02 * total;
                }
                // feeAssessBLDRA()
                else if (projectType == "RB" || projectType == "RA") {
                    valuation = BldrnValuationAdjustment(
                      parseInt($('#livingSpaceArea').val()),
                      parseInt($('#veneerChoice').val()),
                      parseInt($('#carport').val()),
                      parseInt($('#deckArea').val()),
                      parseInt($('#premanArea').val()),
                      parseInt($('#garageArea').val()),
                      parseInt($('#basementArea').val()),
                      "VB",
                      "R-3 Residential, one- and two-family");
                    
                    valuation = parseFloat(valuation);
                    console.log("Code Calculated Valuation: " + valuation);
                    if ($('#remodelCost').val()) {
                        valuation += parseFloat($('#remodelCost').val());
                    }
                         
                    permitFee = .0281 * valuation;
                    if (permitFee < 180) permitFee = 180;

                    siteFee = .65 * permitFee;
                    sitePlanrev = .45 * permitFee;
                    planRevFee = .45 * permitFee;
                    techFund = .05 * (permitFee + planRevFee);
                    emergencyFund = .05 * permitFee;
                    resourceFund = .05 * (permitFee + planRevFee);
                    reserveFund = .02 * (permitFee + planRevFee);
                } else {
                    valuation = $('#remodelCost').val();

                    permitFee = .0281 * valuation;
                    if (permitFee < 180) permitFee = 180;

                    planRevFee = .45 * permitFee;
                    techFund = .05 * (permitFee + planRevFee);
                    emergencyFund = .05 * (permitFee);
                    resourceFund = .05 * (permitFee + planRevFee);
                    reserveFund = .02 * (permitFee + planRevFee);
                }
                stateFee = 6.50;
            }

            // stateFee = StateBldCalc(numUnits);

            $('.description').addClass('open').addClass('disclaimer').html("<div class=\"disclaimer\">This fee estimator is intended for informational purposes only, and currently available for limited permit types.  Please note, complete identification of all required permits and final fee calculations will be completed during the processing of a permit application.</div>");

            total = permitFee + techFund + emergencyFund + resourceFund + reserveFund + stateFee + planRevFee + annual + useFee + bonding + siteFee + sitePlanrev + barricade;
            grandTotal += total;

            var feeVar = [permitFee, techFund, emergencyFund, resourceFund, reserveFund, stateFee, planRevFee, annual, useFee, bonding, siteFee, sitePlanrev, barricade, rowFee, preFee];
            feeDetailsMaker('#bldPermitFeeDetails', feeVar);

            $('#bldPermitFeeDetails .total').html(makeMoney(total));
        }
        // feeAssessPLMBC() feeAssessPLMBR()
        else if (permits[i] == "plm") {
            permitFee = 0;
            techFund = 0;
            emergencyFund = 0;
            reserveFund = 0;
            resourceFund = 0;
          
            if ($('.plmProjectType').val() == 'residential') {
                permitFee = .0281 * $('.plmValuation').val();
                if (permitFee < 180) permitFee = 180;
            } else if ($('.plmProjectType').val() == 'commercial') {
                permitFee = 60;
                permitFee += (43 + (17 * ($('.fixtureQuantity').val() - 1)));
            } else {
                console.log("No Project Type!");
                permitFee = 0;
            }

            techFund = .05 * permitFee;
            emergencyFund = .05 * permitFee;
            resourceFund = .05 * permitFee;
            reserveFund = .02 * permitFee;

            total = permitFee + techFund + emergencyFund + resourceFund + reserveFund + stateFee + planRevFee + annual + useFee + bonding + siteFee + sitePlanrev + barricade;
            grandTotal += total;

            var feeVar = [permitFee, techFund, emergencyFund, resourceFund, reserveFund, stateFee, planRevFee, annual, useFee, bonding, siteFee, sitePlanrev, barricade, rowFee, preFee];
            feeDetailsMaker('#plmPermitFeeDetails', feeVar);

            $('#plmPermitFeeDetails .total').html(makeMoney(total));
        } else if (permits[i] == "mech") {
            permitFee = 0;
            techFund = 0;
            emergencyFund = 0;
            reserveFund = 0;
             
            if ($('.mechValuation').val() > 0) {
                permitFee = $('.mechValuation').val() * .0281;
                if (permitFee < 180) permitFee = 180;

                techFund = .05 * permitFee;
                emergencyFund = .05 * permitFee;
                reserveFund = .02 * permitFee;
            } else {
                console.log("No mechanical valation was entereed");
            }

            total = permitFee + techFund + emergencyFund + resourceFund + reserveFund + stateFee + planRevFee + annual + useFee + bonding + siteFee + sitePlanrev + barricade;
            grandTotal += total;

            var feeVar = [permitFee, techFund, emergencyFund, resourceFund, reserveFund, stateFee, planRevFee, annual, useFee, bonding, siteFee, sitePlanrev, barricade, rowFee, preFee];
            feeDetailsMaker('#mechPermitFeeDetails', feeVar);

            $('#mechPermitFeeDetails .total').html(makeMoney(total));


        }
        // feeAssessSEWER()
        else if (permits[i] == "sewer") {
            permitFee = 120;

            if ($('.connectionType').val() == "adding") {
                permitFee += 430
            } else {
                permitFee += 380;
            }
            if ($('.rowRestoration').val() == "will") {
                rowFee = 110;
            }
            barricade += findMinFee(69, 350, $('.daysForBarricade').val());
            //TODO: add helper text for meter fee
            techFund = .05 * (permitFee + barricade + rowFee);
            emergencyFund = 0;
            resourceFund = .05 * (permitFee + barricade + rowFee);
            reserveFund = .02 * (permitFee + barricade + rowFee);

            total = permitFee + techFund + emergencyFund + resourceFund + reserveFund + stateFee + planRevFee + annual + useFee + bonding + siteFee + sitePlanrev + barricade + rowFee;
            grandTotal += total;

            var feeVar = [permitFee, techFund, emergencyFund, resourceFund, reserveFund, stateFee, planRevFee, annual, useFee, bonding, siteFee, sitePlanrev, barricade, rowFee, preFee];
            feeDetailsMaker('#sewerPermitFeeDetails', feeVar);

            $('#sewerPermitFeeDetails .total').html(makeMoney(total));
        }
        // feeAssessWater()
        else if (permits[i] == "wtr") {
            permitFee = 0;

            if ($('.connectionType').val() == "adding") {
                permitFee += 210;
            } else {
                permitFee = 110;
            }

            if ($('.rowRestoration').val() == "will") {
                rowFee = 110;
            } else {
              rowFee = 0;
            }

            if ($('.barricadeIf').val() == "will") {
                barricade += findMinFee(69, 350, $('.daysForBarricade').val());
            } else {
              barricade = 0;
            }

            techFund = .05 * (permitFee + barricade + rowFee);
            emergencyFund = 0;
            resourceFund = .05 * (permitFee + barricade + rowFee);
            reserveFund = .02 * (permitFee + barricade + rowFee);

            total = permitFee + techFund + emergencyFund + resourceFund + reserveFund + stateFee + planRevFee + annual + useFee + bonding + siteFee + sitePlanrev + barricade + rowFee;
            grandTotal += total;

            var feeVar = [permitFee, techFund, emergencyFund, resourceFund, reserveFund, stateFee, planRevFee, annual, useFee, bonding, siteFee, sitePlanrev, barricade, rowFee, preFee];
            feeDetailsMaker('#wtrPermitFeeDetails', feeVar);

            $('#wtrPermitFeeDetails .total').html(makeMoney(total));
        }
        // feeAssessStorm()
        else if (permits[i] == "storm") {
            if ($('.dischargePoint').val() != "a sidewalk drain") {
                permitFee = 510;
                if ($('.rowRestoration').val() == "will") {
                    rowFee = 52;
                }
            } else {
                permitFee = 510;
            }

            barricade += findMinFee(69, 350, $('.daysForBarricade').val());

            techFund = .05 * (permitFee + barricade + rowFee);
            emergencyFund = 0;
            resourceFund = .05 * (permitFee + barricade + rowFee);
            reserveFund = .02 * (permitFee + barricade + rowFee);

            total = permitFee + techFund + emergencyFund + resourceFund + reserveFund + stateFee + planRevFee + annual + useFee + bonding + siteFee + sitePlanrev + barricade;
            grandTotal += total;

            var feeVar = [permitFee, techFund, emergencyFund, resourceFund, reserveFund, stateFee, planRevFee, annual, useFee, bonding, siteFee, sitePlanrev, barricade, rowFee, preFee];
            feeDetailsMaker('#stormPermitFeeDetails', feeVar);

            $('#stormPermitFeeDetails .total').html(makeMoney(total));
        }
        // feeAssessSDEV()
        else if (permits[i] == "sitedev") {
            var grading = parseInt($('#cutArea').val()) + parseInt($('#fillArea').val());
            var clearingArea = parseInt($('#clearingArea').val());
            var disturbedArea = parseInt($('#disturbedArea').val());
            var hardSurfaceArea = parseInt($('#hardSurfaceArea').val());
            var isHourly = false;

            if (hardSurfaceArea > 50000 || grading > 10000 || disturbedArea > 435600) {
                permitFee = -1; // Major Level 2: Hourly
            } else if (hardSurfaceArea > 5000 || grading > 500 || disturbedArea > 43560) {
                permitFee = 6240; // Major Level 1
            } else if (hardSurfaceArea > 2000 || grading > 50 || disturbedArea > 7000) {
                permitFee = 2810; // Minor Level 2
            } else if (hardSurfaceArea < 2000 && grading < 50 && disturbedArea < 7000) {
                permitFee = 460; // Minor Level 1
            }

            // Set funds if not calculated hourly
            var tMaker = 0;
            if (permitFee > 0) {
                techFund = .05 * permitFee;
                emergencyFund = .05 * permitFee;
                resourceFund = .05 * permitFee;
                reserveFund = .02 * permitFee;
                tMaker = permitFee;
            } else { // hourly calc needs -1 for special funds
                isHourly = true;
                permitFee = -1; // hard set in case its 0
                techFund = -1;
                emergencyFund = -1;
                resourceFund = -1;
                reserveFund = -1;
            }

            total = tMaker + techFund + emergencyFund + resourceFund + reserveFund + stateFee + planRevFee + annual + useFee + bonding + siteFee + sitePlanrev + barricade;

            if(isHourly) total = 0;

            grandTotal += total;

            var feeVar = [permitFee, techFund, emergencyFund, resourceFund, reserveFund, stateFee, planRevFee, annual, useFee, bonding, siteFee, sitePlanrev, barricade, rowFee, preFee];
            feeDetailsMaker('#sitedevPermitFeeDetails', feeVar);

            if (total > 0) {
                $('#sitedevPermitFeeDetails .total').html(makeMoney(total));
            } else {
                $('#sitedevPermitFeeDetails .total').html('Hourly - See Detail');
            }

        } else if (permits[i] == "wo") {
            // hourly calc needs -1 for special funds
            isHourly = true;
            permitFee = -1;
            techFund = -1;
            emergencyFund = -1;
            resourceFund = -1;
            reserveFund = -1;

            total = tMaker + techFund + emergencyFund + resourceFund + reserveFund + stateFee + planRevFee + annual + useFee + bonding + siteFee + sitePlanrev + barricade;

            if(isHourly) total = 0;

            grandTotal += total;

            var feeVar = [permitFee, techFund, emergencyFund, resourceFund, reserveFund, stateFee, planRevFee, annual, useFee, bonding, siteFee, sitePlanrev, barricade, rowFee, preFee];
            feeDetailsMaker('#woPermitFeeDetails', feeVar);

            if (total > 0) {
                $('#woPermitFeeDetails .total').html(makeMoney(total));
            } else {
                $('#woPermitFeeDetails .total').html('Hourly - See Detail');
            }

        }
        // feeAssessSIGN()
        else if (permits[i] == "sign") {
            valuation = $('#signCost').val();

            permitFee = BldPermitCalc(valuation);
            barricade += findMinFee(69, 350, $('.daysForBarricade').val());

            planRevFee = (permitFee * .65);
            if (planRevFee < 54) {
                planRevFee = 54;
            }

            techFund = .05 * (planRevFee + permitFee + barricade);
            emergencyFund = .05 * (permitFee + barricade);
            resourceFund = .05 * (planRevFee + permitFee + barricade);
            reserveFund = .02 * (planRevFee + permitFee + barricade);

            total = permitFee + techFund + emergencyFund + resourceFund + reserveFund + stateFee + planRevFee + annual + useFee + bonding + siteFee + sitePlanrev + barricade;
            grandTotal += total;

            var feeVar = [permitFee, techFund, emergencyFund, resourceFund, reserveFund, stateFee, planRevFee, annual, useFee, bonding, siteFee, sitePlanrev, barricade, rowFee, preFee];
            feeDetailsMaker('#signPermitFeeDetails', feeVar);

            $('#signPermitFeeDetails .total').html(makeMoney(total));
        }
        // feeAssessDEMOC() feeAssessDEMOR()
        else if (permits[i] == "demo") {
            var dType = $('#demoType').val();
            if (dType == "residential") {
                permitFee = 180;
            } else if (dType == "commercial") {
                permitFee = 300;
            }

            techFund = .05 * permitFee;
            emergencyFund = .05 * permitFee;
            resourceFund = .05 * permitFee;
            reserveFund = .02 * permitFee;

            total = permitFee + techFund + emergencyFund + resourceFund + reserveFund + stateFee + planRevFee + annual + useFee + bonding + siteFee + sitePlanrev + barricade;
            grandTotal += total;

            var feeVar = [permitFee, techFund, emergencyFund, resourceFund, reserveFund, stateFee, planRevFee, annual, useFee, bonding, siteFee, sitePlanrev, barricade, rowFee, preFee];
            feeDetailsMaker('#demoPermitFeeDetails', feeVar);

            $('#demoPermitFeeDetails .total').html(makeMoney(total));
        }
        // feeAssessLU()
        else if (permits[i] == "land") {
            var resourcePermitFee = 0;

            for (var i = 0; i < useRows.length; i += 2) {
                // calculates permit fee
                permitFee = landUseFee(useRows[i], useRows[i + 1]);

                // adds reserve fund if critical areas or shoreline permit type
                if (useRows[i] == 'critical areas' || useRows[i] == 'shoreline') {
                  resourcePermitFee += permitFee;
                }
            }
      
            techFund = .05 * permitFee;
            reserveFund = .02 * permitFee;

            // if there are reserve fund permits types then add the dedicated fee.
            if (resourcePermitFee) {
              resourceFund = .05 * permitFee;
            }

            total = permitFee + techFund + emergencyFund + resourceFund + reserveFund + stateFee + planRevFee + annual + useFee + bonding + siteFee + sitePlanrev + barricade;
            grandTotal += total;

            var feeVar = [permitFee, techFund, emergencyFund, resourceFund, reserveFund, stateFee, planRevFee, annual, useFee, bonding, siteFee, sitePlanrev, barricade, rowFee, preFee];

            feeDetailsMaker('#landPermitFeeDetails', feeVar);
            $('#landPermitFeeDetails .total').html(makeMoney(total));
        }
        // feeAssessFIREC() feeAssessFIRER()
        else if (permits[i] == "fire") {
            var naturalFees = true; // default to true with some exceptions
            var fireCategory = $('#fireCategories').val();

            if (fireCategory == "fire alarms") {
                permitFee = fireAlarmCalc($('#pgfire .q2 input').val());
                naturalFees = false;
            }
            if (fireCategory == "pre-engineered systems") {
                permitFee = 1020 + (Math.max(0, $('#firePreEngNoz').val() - 50) * 3.5);
                naturalFees = false;
            }
            if (fireCategory == "kitchen hood suppression systems") {
                permitFee = $('#pgfire .q2 input').val() * 450;
            }
            if (fireCategory == "private fire service mains and their appurtenances") {

            }
            if (fireCategory == "underground fire systems") {
                permitFee = $('#pgfire .q2 input').val() * 380;
            }
            if (fireCategory == "fire sprinkler tenant improvement") {
                if ($('#fireSprinklerHeads').val() <= 6) {
                    permitFee = 300;
                }
                if ($('#fireSprinklerHeads').val() >= 7 && $('#fireSprinklerHeads').val() <= 20) {
                    permitFee = 590;
                }
                if ($('#fireSprinklerHeads').val() > 20) {
                    //permitFee = 1500; //added $910 for riser requirement when over 20 heads 
                    
                    permitFee = 910 + (5 * ($('#fireSprinklerHeads').val() - 20)) // kinda same logic for new, but just 1 910 + Number of sprinkers - 20 * 5
                }
            }
            if (fireCategory == "new water based fire suppression systems") {
                permitFee = fireSprinklerCalc($('#fireSuppressionRisers').val(), $('#fireSuppressionHeads').val());
                permitFee += $('#fireSuppressionStandpipes').val() * 450;
                permitFee += $('#fireSuppressionPumps').val() * 730;
            }
            if (fireCategory == "smoke control systems") {
                planRevFee = 300;
                permitFee = 300;
                naturalFees = false;
            }
            if (naturalFees){
                resourceFund = .05 * permitFee;
            }

            techFund = .05 * permitFee;
            emergencyFund = .05 * permitFee;
            reserveFund = .02 * permitFee;

            total = permitFee + techFund + emergencyFund + resourceFund + reserveFund + stateFee + planRevFee + annual + useFee + bonding + siteFee + sitePlanrev + barricade;
            grandTotal += total;

            var feeVar = [permitFee, techFund, emergencyFund, resourceFund, reserveFund, stateFee, planRevFee, annual, useFee, bonding, siteFee, sitePlanrev, barricade, rowFee, preFee];
            feeDetailsMaker('#firePermitFeeDetails', feeVar);

            $('#firePermitFeeDetails .total').html(makeMoney(total));
        }
        // feeAssessEVENT()
        else if (permits[i] == "event") {
            var mailingFee = 0, lateFee = 0;
            if ($('#eventOrgType').val() == "commercial") {
                permitFee = 75;
                // mailingFee = 100 * parseInt($('#eventBlocks').val());
            } else {
              permitFee = 50;
              // mailingFee = 75 * parseInt($('#eventBlocks').val());
            }

 
            var discountDate = new Date();
            discountDate.setDate(discountDate.getDate() + 60);
            if (new Date($('#eventDate').val()) > discountDate) {
                lateFee = (permitFee + mailingFee) * .1;
            }

            permitFee += mailingFee + lateFee;

            total = permitFee + techFund + emergencyFund + resourceFund + reserveFund + stateFee + planRevFee + annual + useFee + bonding + siteFee + sitePlanrev + barricade;
            grandTotal += total;

            var feeVar = [permitFee, techFund, emergencyFund, resourceFund, reserveFund, stateFee, planRevFee, annual, useFee, bonding, siteFee, sitePlanrev, barricade, rowFee, preFee];

            feeDetailsMaker('#eventPermitFeeDetails', feeVar);

            $('#eventPermitFeeDetails .total').html(makeMoney(total));
        }
        // feeAssessPRE()
        else if (permits[i] == "pre") {
            if ($('#preOptionA').is(':checked'))
                preFee = 1560;
            else if ($('#preOptionB').is(':checked'))
                preFee = 3120;

            total = permitFee + techFund + emergencyFund + resourceFund + reserveFund + stateFee + planRevFee + annual + useFee + bonding + siteFee + sitePlanrev + barricade + preFee;
            grandTotal += total;

            var feeVar = [permitFee, techFund, emergencyFund, resourceFund, reserveFund, stateFee, planRevFee, annual, useFee, bonding, siteFee, sitePlanrev, barricade, rowFee, preFee];
            feeDetailsMaker('#prePermitFeeDetails', feeVar);

            $('#prePermitFeeDetails .total').html(makeMoney(total));
        }
        // feeAssessROCC() feeAssessRUTI() feeAssessRCON() feeAssessRUSE()
        else if (permits[i] == "row") {
            if ($('#rowType').val() == "construction within (RCON)") {
                permitFee = RconCalc();
            } else if ($('#rowType').val() == "occupancy of (ROCC)") {
                if ($('#rowOcc').val() == "residential") {
                    permitFee = 640.00;
                    planRevFee = 0;
                    annual = 0;
                    useFee = 0;
                    bonding = 0;
                } else if ($('#rowOcc').val() == "commercial") {
                    permitFee = 640.00;
                    planRevFee = 0;
                    annual = 0;
                    useFee = 0;
                    bonding = 0;
                } else if ($('#rowOcc').val() == "temporary sidewalk cafe") {
                    planRevFee = 0;
                    annual = 0;
                    useFee = 0;
                    bonding = 0;
                } else if ($('#rowOcc').val() == "sidewalk cafe") {
                    planRevFee = 0;
                    annual = 0;
                    useFee = 0;
                    bonding = 0;
                } else if ($('#rowOcc').val() == "ground water monitoring well") {
                    permitFee = 640.00;
                    planRevFee = 0;
                    annual = 0;
                    if ($('#rowWell').val() == 1) {
                        useFee = 175.00
                    } else if ($('#rowWell').val() > 1) {
                        useFee = (($('#rowWell').val() - 1) * 150.00) + 175.00
                    }
                    bonding = 10000.00;
                }
            } else if ($('#rowType').val() == "use of (RUSE)") {
                permitFee = RuseCalc();
            } else if ($('#rowType').val() == "utility work in (RUTI)") {
                permitFee = RutiCalc();
            }

            /* Barricade Fee */
            if ($('#pgrow .daysForBarricade').val()) {
                barricade += findMinFee(69, 350, $('#pgrow .daysForBarricade').val());
            }

            /* Emergency Fund if ROCC */
            if ($('#rowType').val() != "occupancy of (ROCC)") {
                techFund = .05 * (permitFee + barricade);
                resourceFund = .05 * (permitFee + barricade);
                reserveFund = .02 * (permitFee + barricade);
            }



            total = permitFee + techFund + emergencyFund + resourceFund + reserveFund + stateFee + planRevFee + annual + useFee + bonding + siteFee + sitePlanrev + barricade;
            grandTotal += total;

            var feeVar = [permitFee, techFund, emergencyFund, resourceFund, reserveFund, stateFee, planRevFee, annual, useFee, bonding, siteFee, sitePlanrev, barricade, rowFee, preFee];

            feeDetailsMaker('#rowPermitFeeDetails', feeVar);

            $('#rowPermitFeeDetails .total').html(makeMoney(total));
        }
    }
    $('#grandTotal').html(makeMoney(grandTotal));
}

function feeDetailsMaker(rec, feeVar) {
    var appendTmp;
    var htmlTmp;
    var feeSection = ['.base', '.techFund', '.emergencyFund', '.resourceFund', '.reserveFund', '.state', '.review', '.annual', '.useFee', '.bonding', '.siteFee', '.sitePlanrev', '.barricadeFee', '.rowFee', '.preFee'];
    for (var i = 0; i < feeVar.length; i++) {
        if (feeVar[i] != 0) {
            appendTmp = rec + ' .fee-sub-items';
            htmlTmp = rec + ' ' + feeSection[i] + ' .money';
            $(appendTmp).append(feeDetailsVar[i]);
            if ($(htmlTmp).html() != "") $(htmlTmp).html("");
            if (feeVar[i] == -1) {
                switch(i){
                  case 0: $(htmlTmp).html('$190/hour');
                          break;
                  case 1:
                  case 2:
                  case 3: $(htmlTmp).html('5% of Base Fee');
                          break;
                  case 4: $(htmlTmp).html('2% of Base Fee');
                          break;
                  default: $(htmlTmp).html('Hourly');
                          break;
                }

            } else {
                $(htmlTmp).html(makeMoney(feeVar[i]));
            }
        }
    }
}

function backPermit(thisperm) {
    if (permits.length == 1 || thisperm == permits[0]) {
        $('#details-num').text("");
        $('#pgfirst-pointer').removeClass('post');
        $('.description').addClass('open').removeClass('disclaimer').html(pg1and2instructions);
        $('#pg' + thisperm + ', #pgmid-pointer').removeClass('active');
        $('#pgfirst, #pgfirst-pointer').addClass('active');
    } else {
        $('#details-num').text(" (" + $.inArray(thisperm, permits) + "/" + permits.length + ")");
        currentPermit = permits[$.inArray(thisperm, permits) - 1];
        $('#pg' + thisperm).removeClass('active');
        $('#pg' + currentPermit + ', #pgmid-pointer').addClass('active');
    }
}

function nextPermit(thisperm) {
    $('#details-num').text(" (" + ($.inArray(thisperm, permits) + 1) + "/" + permits.length + ")");
    if (thisperm == "bld") {
        bldPermit();
    } else if (thisperm == "wtr") {
        wtrPermit();
    } else if (thisperm == "plm") {
        plmPermit();
    } else if (thisperm == "mech") {
        mechPermit();
    } else if (thisperm == "storm") {
        stormPermit();
    } else if (thisperm == "sewer") {
        sewerPermit();
    } else if (thisperm == "sitedev") {
        sitedevPermit();
    } else if (thisperm == "wo") {
        woPermit();
    } else if (thisperm == "sign") {
        signPermit();
    } else if (thisperm == "demo") {
        demoPermit();
    } else if (thisperm == "land") {
        landPermit();
    } else if (thisperm == "fire") {
        firePermit();
    } else if (thisperm == "event") {
        eventPermit();
    } else if (thisperm == "row") {
        rowPermit();
    } else if (thisperm == "pre") {
        prePermit();
    }
}

function makeMoney(num) {
    var halves = num.toString().split('.');
    var leftHalf, rightHalf;
    if (halves[1]) {
        rightHalf = halves[1].split('');
        leftHalf = halves[0];
        if (rightHalf.length == 1) {
            rightHalf += "0";
        } else if (rightHalf.length == 2) {
            rightHalf = rightHalf.join('');
        } else if (rightHalf.length > 2) {
            rightHalf.splice(2, 0, '.');
            rightHalf = rightHalf.join('');
            rightHalf = Math.round(rightHalf);
            if (rightHalf > 99) {
                rightHalf -= 100;
                leftHalf = parseInt(leftHalf) + 1;
            }
            if (rightHalf == 0) {
                rightHalf = "00";
            } else if (rightHalf < 10) {
                rightHalf = "0" + rightHalf;
            }
            leftHalf = leftHalf.toString().split('');
            for (var i = leftHalf.length - 3; i > 0; i -= 3) {
                leftHalf.splice(i, 0, ',');
            }
            leftHalf = leftHalf.join('');
        }
    } else {
        leftHalf = halves[0].split('');
        for (var i = leftHalf.length - 3; i > 0; i -= 3) {
            leftHalf.splice(i, 0, ',');
        }
        leftHalf = leftHalf.join('');
        rightHalf = "00";
    }
    return "$" + leftHalf + "." + rightHalf;
}

/* Functions used for finding valuation */
function getBVD (const_type, occ_type) {
    var oConstType = ["IA", "IB", "IIA", "IIB", "IIIA", "IIIB", "IV", "VA", "VB"],
        oOccType = ["A-1 Assembly, theaters, with stage", "A-1 Assembly, theaters, without stage", "A-2 Assembly, nightclubs", "A-2 Assembly, restaurants, bars, banquet halls", "A-3 Assembly, churches", "A-3 Assembly, general, community halls, libraries, museums", "A-4 Assembly, arenas", "B Business", "E Educational", "F-1 Factory and industrial, moderate hazard", "F-2 Factory and industrial, low hazard", "H-1 High Hazard, explosives", "H234 High Hazard", "H-5 HPM", "I-1 Institutional, supervised environment", "I-2 Institutional, hospitals", "I-2 Institutional, nursing homes", "I-3 Institutional, restrained", "I-4 Institutional, day care facilities", "M Mercantile", "R-1 Residential, hotels", "R-2 Residential, multiple family", "R-3 Residential, one- and two-family", "R-4 Residential, care/assisted living facilities", "S-1 Storage, moderate hazard", "S-2 Storage, low hazard", "U Utility, miscellaneous"],
        bvdMatrix = [
            [335.89, 324.58, 316.94, 304.93, 286.87, 278.00, 295.62, 266.02, 257.55],
            [307.39, 296.08, 288.44, 276.42, 258.37, 249.50, 267.12, 237.51, 229.05],
            [269.94, 261.93, 254.48, 245.85, 230.56, 223.99, 237.02, 209.57, 202.79],
            [268.94, 260.93, 252.48, 244.85, 228.56, 222.99, 236.02, 207.57, 201.79],
            [311.88, 300.57, 292.93, 280.91, 263.30, 254.43, 271.60, 242.45, 233.98],
            [266.07, 254.76, 246.12, 235.10, 216.33, 208.46, 225.80, 195.47, 188.01],
            [306.39, 295.08, 286.44, 275.42, 256.37, 248.50, 266.12, 235.51, 228.05],
            [260.69, 251.13, 241.86, 231.65, 210.99, 202.73, 222.56, 186.21, 177.81],
            [273.46, 263.96, 255.62, 245.04, 228.69, 217.00, 236.61, 200.36, 193.94],
            [160.20, 152.78, 143.34, 138.64, 123.55, 117.41, 132.48, 102.44, 95.93],
            [159.20, 151.78, 143.34, 137.64, 123.55, 116.41, 131.48, 102.44, 94.93],
            [149.46, 142.04, 133.60, 127.90, 114.12, 106.97, 121.74, 93.00, 0.00],
            [149.46, 142.04, 133.60, 127.90, 114.12, 106.97, 121.74, 93.00, 85.50],
            [260.69, 251.13, 241.86, 231.65, 210.99, 202.73, 222.56, 186.21, 177.81],
            [262.22, 252.95, 244.31, 235.67, 215.42, 209.47, 235.71, 193.82, 187.73],
            [434.15, 424.59, 415.32, 405.12, 383.35, 0.00, 396.02, 358.57, 0.00],
            [302.01, 292.45, 283.18, 272.97, 253.83, 0.00, 263.88, 229.05, 0.00],
            [295.86, 286.31, 277.03, 266.83, 247.95, 238.69, 257.74, 223.17, 212.77],
            [262.22, 252.95, 244.31, 235.67, 215.42, 209.47, 235.71, 193.82, 187.73],
            [201.37, 193.36, 184.91, 177.28, 161.72, 156.15, 168.45, 140.73, 134.95],
            [264.67, 255.41, 246.77, 238.13, 218.35, 212.40, 238.17, 196.75, 190.67],
            [221.32, 212.06, 203.42, 194.78, 175.96, 170.01, 194.82, 154.36, 148.28],
            [209.61, 203.74, 198.94, 195.12, 188.41, 181.45, 191.77, 175.86, 165.67],
            [262.22, 252.95, 244.31, 235.67, 215.42, 209.47, 235.71, 193.82, 187.73],
            [148.46, 141.04, 131.60, 126.90, 112.12, 105.97, 120.74, 91.00, 84.50],
            [147.46, 140.04, 131.60, 125.90, 112.12, 104.97, 119.74, 91.00, 83.50],
            [114.09, 107.37, 99.89, 95.60, 85.13, 79.54, 90.99, 67.39, 64.19]
        ],
        iConType = getIndex(const_type, oConstType),
        iOccType = getIndex(occ_type, oOccType),
        bvdValue = 0;
    if (iConType == -1 || iOccType == -1) {
        bvdValue = -1;
    } else {
        bvdValue = bvdMatrix[iOccType][iConType];
    }
    return bvdValue;
}

function getIndex (value, array) {
    for (var i = 0; i < array.length; i++) {
        if (value == array[i]) {
            return i;
        }
    }
    return -1;
}

function BldPermitCalc (valuation) {
    var permitfee = 0;
    if (valuation == null) {
        return 0;
    }

    valuation = parseInt(valuation);
    if (valuation <= 500) {
        permitfee = 53;
    } else if (valuation >= 500 && valuation <= 2000) {
        permitfee = ((Math.ceil((valuation - 500) / 100) * 7) + 53);
    } else if (valuation >= 2000 && valuation <= 25000) {
        permitfee = ((Math.ceil((valuation - 2000) / 1000) * 30) + 160);
    } else if (valuation >= 25000 && valuation <= 50000) {
        permitfee = ((Math.ceil((valuation - 25000) / 1000) * 23) + 850);
    } else if (valuation >= 50000 && valuation <= 100000) {
        permitfee = ((Math.ceil((valuation - 50000) / 1000) * 15) + 1410);
    } else if (valuation >= 100000 && valuation <= 500000) {
        permitfee = ((Math.ceil((valuation - 100000) / 1000) * 13) + 2160);
    } else if (valuation >= 500000 && valuation <= 1000000) {
        permitfee = ((Math.ceil((valuation - 500000) / 1000) * 10) + 7150);
    } else if (valuation >= 1000000) {
        permitfee = ((Math.ceil((valuation - 1000000) / 1000) * 8.5) + 12140);
    }
    return parseFloat(permitfee);
}

function CompPlanReviewCalc (permit_fee) {
    var planrev = (permit_fee * .65).toFixed(2);
    if (planrev < 54) {
        planrev = 54;
    }
    return parseFloat(planrev);
}

function BldrnValuationAdjustment(livingSpace, roofVeneer, carport, deckArea, premanArea, garageArea, unfinishedBasement, consType, occGroup) {
    var totalArea = 0;
    var val = 0;

    if (livingSpace) {
        totalArea += livingSpace;
    }
    if (carport) {
        totalArea += carport;
        val += (carport * (getBVD("VB", "U Utility, miscellaneous") * .75));
    }
    if (deckArea) {
        totalArea += deckArea;
        val += (deckArea * (getBVD("VB", "U Utility, miscellaneous") * .67)); //67% BVD
    }
    if (premanArea) {
        totalArea += premanArea;
        val += (premanArea * (getBVD("VB", "R-3 Residential, one- and two-family") * .5)); //50% BVD
    }
    if (garageArea) {
            // totalArea += garageArea; This has been removed as it isn't consistent with how we calculate total area in accela. 
        val += (garageArea * (getBVD(consType, "U Utility, miscellaneous")));
    }
    if (unfinishedBasement) {
        totalArea += unfinishedBasement;
        val += unfinishedBasement * 31.50;
    }
    if (livingSpace) {
        if (totalArea > 2000 || roofVeneer == "Yes") {
            val += (livingSpace * (getBVD(consType, occGroup) * 1.25)); //125% BVD
        } else {
            val += (livingSpace * getBVD(consType, occGroup));
        }
        // aa.print(getBVD(consType, occGroup));
    }
    return Number(val).toFixed(2);
}

function StateBldCalc(units) {
    if (arguments.length > 1) {
        if (arguments[1] == 1) {
            if (units > 1) {
                var sfee = (2 * (units - 1)) + 4.50;
            } else {
                var sfee = 4.50;
            }
        } else {
            var sfee = 4.50;
        }
    } else {
        var sfee = 4.50;
    }
    return parseFloat(sfee);
}

function findMinFee(dailyFee, monthlyFee, numDays) {
    var minFee = 0;
    var numMonths = Math.floor(numDays / 30);
    var remainingDays = 0;
    if (numDays > 30) {
        remainingDays = numDays - 30;
        minFee = monthlyFee + findMinFee(dailyFee, monthlyFee, remainingDays);
    } else if (numDays > 5) {
        minFee = monthlyFee;
    } else {
        minFee = numDays * dailyFee;
    }
    return minFee;
}

function isMetered(numDays, cap) {
    capId = cap;
    var parkingZone = getAppSpecific("OVERTIMEPARKING");
    var cost = 0;
    switch (parkingZone) {
        case "A":
        case "C":
            cost = 10 * numDays;
            break;
        case "B":
            cost = 12 * numDays;
            break;
        case "D":
            cost = 8 * numDays;
            break;
    }
    return cost;
}

function landUseFee(q1, q2) {
    if (q1 == 'major modification of permit' || q1 == 'open space use classification' || q1 == 'site approval' || q1 == 'site rezone/reclassification' || q1 == 'special development permit' || q1 == 'temporary homeless camp' || q1 == 'waiver') {
        q2 = "N/A";
    }

    var NOFEE= 0,
    ADU01= 1250,
    ADU02= 450,
    AEN01= 630,
    AEN02= 1250,
    AEN03= 2500,
    CU01= 6240,
    CA01= 1250,
    CA02= 6240,
    CA03= 4370,
    CA04= 11230,
    DRA01= 6240,
    ER01= 0,
    ER02= 1250,
    ER03= 2500,
    ER04= 4370,
    IR01= 320,
    IR02= 6240,
    OSUC01= 6240,
    PBS01= 380,
    PBS02= 3500,
    PBS03= 2250,
    PBS04= 3500,
    PBS05= 3500,
    PBS06= 5490,
    PBS07= 10480,
    PBS08= 1250,
    PBS09= 2750,
    PBS10= 60,
    PBS11= 290,
    PBS12= 12,
    S01= 380,
    S02= 1250,
    S03= 3750,
    S04= 0,
    S05= 7490,
    S06= 3170,
    S07= 230,
    SA01= 8740,
    SR01= 12730,
    SD01= 6240,
    THC01= 2540,
    V01= 3750,
    V02= 2500,
    V03= 3750,
    V04= 5000,
    W01= 6240;

    var luFeeCodes = { // list of permit types and their relevant fee item codes
        "accessory dwelling unit": {
            "attached": ADU01,
            "detached": ADU01,
            "ADU reauthorization": ADU02
        },
        "additional/expanded notice": {
            "100-400 feet (additional only)": AEN01,
            "1000 feet": AEN02,
            "2500 feet": AEN03
        },
        "conditional use": {
            "large scale retail": CU01,
            "correctional facility": CU01,
            "detention facility": CU01,
            "all others": CU01
        },
        "critical areas": {
            "activities allowed with staff review": CA01,
            "development permit": CA04,
            "minor development permit": CA02,
            "verification": CA03
        }, 
        "development regulation agreement": {
            "affordable housing (not in designated center) - 1 acre or more in size": DRA01,
            "downtown regional growth center - landmarks historic structure": DRA01,
            "downtown regional growth center - public ownership": DRA01,
            "international financial services area (IFSA)": DRA01,
            "public facility site - 5 acres or more in size": DRA01,
            "tacoma mall neighborhood regional growth center - 2 acres or more in size": DRA01
        },
        "environmental review": {
            "environmental impact statement": ER01,
            "SEPA with a discretionary land use permit": ER02,
            "residential buildings (20+ units, under 12000 sf), signs, parking lots, misc actions": ER03,
            "residential buildings (20+ units, over 12000 sf), grading (over 500 cy)": ER04
        },
        "information requests": {
            "determination or interpretation by director": IR02,
            "zoning verification letter": IR01
        },
        "major modification of permit": {
            "N/A": NOFEE
        },
        "open space use classification": {
            "N/A": OSUC01
        },
        "plats / BLAs / segregations / combinations": {
            "binding site plan Approval": PBS02,
            "segregation/combination": PBS01,
            "boundary line adjustment (2 Lots)": PBS03,
            "boundary line adjustment (3+ Lots)": PBS04,
            "short plat (2-4 Lots)": PBS05,
            "short plat (5-9 Lots)": PBS06,
            "preliminary plat (10+ Lots)": PBS07,
            "final plat (2-9 Lots)": PBS08,
            "final plat (10+ Lots)": PBS09,
            "GIS drafting (New Plats)": PBS10,
            "GIS drafting (New Short Plat or BLA)": PBS11,
            "E-Vault scanning and indexing": PBS12
        },
        "shoreline": {
            "single family": S05,
            "exemption": S01,
            "other": S04,
            "revisions - single family": S02,
            "revisions - other": S03,
            "sign waiver": S06,
            "extension": S07
        },
        "site approval": {
            "N/A": SA01
        },
        "site rezone/reclassification": {
            "N/A": SR01
        },
        "special development permit": {
            "N/A": SD01
        },
        "temporary homeless camp": {
            "N/A": THC01
        },
        "variance": {
            "height - main building": V01,
            "height - accessory building": V02,
            "single family residential": V03,
            "other": V04
        },
        "waiver": {
            "N/A": W01
        }
    };
    return parseFloat(luFeeCodes[q1][q2], 2);
}

function fireAlarmCalc(devices) {
    var fee = 0.00;
    if (devices < 51) {
        fee = 300;
    } else if (devices > 50 && devices < 101) {
        fee = 590;
    } else if (devices > 100 && devices < 200) {
        fee = 880;
    } else if (devices > 199 && devices < 300) {
        fee = 1170;
    } else if (devices > 299 && devices < 400) {
        fee = 1450;
    } else if (devices > 399 && devices < 601) {
        fee = 1750;
    } else if (devices > 600) {
        fee = devices * 3.5;
    }
    return fee;
}

function fireSprinklerCalc (risers, heads) {
    var riserfee = 910;
    var headfee = 0.00;
    if (risers == 2) {
        riserfee += 910;
    } else if (risers > 2) {
        riserfee += 910 + (45 * (risers - 2));
    }
    if (heads > 20) {
        headfee = 5 * (heads - 20);
    }
    return riserfee + headfee;
}

function RconCalc () {
    var fee = 0;
    var swSize = ($('#rowSidewalkSize').val() * 5) / 9;

    var swFee = Math.max(0, swSize - 30) * 4;
    var cgFee = Math.max(0, $('#rowGutterLength').val() - 50) * 4;

    var asphaltFee = $('#rowAsphaltDrivewayNum').val() * 310;
    var concreteFee = $('#rowConcreteDrivewayNum').val() * 480;

    var trenchFee = 330 + Math.max(0, ($('#rowTrenchLength').val() - 100));
    var boreFee = $('#rowBoreCount').val() * 110;

    /* Curb or gutter work */
    if ($('#rconCurb').is(':checked')) {
        fee += cgFee;
    }

    /* Work on sidewalk */
    if ($('#rconSidewalk').is(':checked')) {
        if ($('#rowSidewalkWork').val() == "adding a new") {
            fee += swFee + 430;
        } else {
            fee += swFee + 510;
        }
    }

    /* Work on driveway */
    if ($('#rconDriveway').is(':checked')) {
        fee += asphaltFee;
        fee += concreteFee;
    }

    /* Trench and / or bore work */
    if ($('#rconTrenchBore').is(':checked')) {
        if ($('#rowTrenchType').val() == "an open cut trench") {
            fee += trenchFee;
        } else if ($('#rowTrenchType').val() == "a monitoring well, a bore, or potholing") {
            fee += boreFee;
        }
    }

    /* The paved area totals ______ square feet */
    if ($('#rowPaving').val() && $('#rowPaving').val() != 0) {
        fee += 310 + Math.ceil(($('#rowPaving').val() - 3000) / 1000);
    }

    return fee;
}

function RuseCalc () {
    var fee = 0;

    if ($('#rowUse').val() == "a special motor vehicle") {
        if ($('#rowSMVType').val() == "an annual" || $('#rowSMVType').val() == "a single trip") {
            fee += 53;
        } else if ($('#rowSMVType').val() == "a house move") {
            fee += 540;
        }
    } else if ($('#rowUse').val() == "overtime parking" && $('#rowUseDays').val() > 0) {
        fee += findMinFee(44, 260, $('#rowUseDays').val());
    } else if ($('#rowUse').val() == "a banner") {
        if ($('#rowBannerInstall').val() == "city") {
            fee += 620 + ($('#rowBannerBlocks').val() * 44);
        } else if ($('#rowBannerInstall').val() == "private") {
            fee += 380 + ($('#rowBannerBlocks').val() * 110);
        }
        if ($('#rowHoliday').is(':checked')) {
            fee += $('#rowBannerBlocks').val() * 69;
        }
    }

    return fee;
}

function RutiCalc () {
    var fee = 0;

    if ($('#rowTrench').val() == "will") {
        fee += 330 + Math.max(0, ($('#rowTrenchLength').val() - 100) * 1.5);
    }
    if ($('#rowBores').val() == "will") {
        fee += $('#rowBoreCount').val() * 110;
    }

    return fee;
}
