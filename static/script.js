var projectType1,projectType2,projectType,fixtures,daysForBarricade,rowRestoration,connectionType,dischargePoint,structureType,hello,activePermit,remodelCost,livingSpaceArea,garageArea,premanArea,basementArea,deckArea,occupRows=[],useRows=[],fixtureRows=[],permits=[],currentPermit="",readyForLastPage=!1,readyforNextPage=!1,ePermitQualifies=!1,valuation=0,total=0,grandTotal=0,planRevFee=0,permitFee=0,smifFee=0,stateFee=0,numUnits=0,currentTable=0,currentColumn=0,acres=0,lots=0,shoreval=0,pages=0,annual=0,useFee=0,bonding=0,techFund=0,emergencyFund=0,emergencyFund=0,reserveFund=0,resourceFund=0,siteFee=0,sitePlanrev=0,barricade=0,rowFee=0,preFee=0,basicPage=`
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
    </button>`,projectTypeText=`
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
  </span>.`,structureTypeText=`
  <p>This project is
    <select id="structureType">
      <option></option>
      <option>a single family home</option>
      <option>a duplex</option>
      <option>an accessory structure</option>
    </select>.
  </p>`,livingSpaceText=`
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
  </p>`,accessoryText=`
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
  </p>`,garageAreaText=`
  <p>The new detached garage area will total
    <input type="number" placeholder="0" min="0" step="50" id="garageArea"> square feet.
  </p>`,carportAreaText=`
  <p>The new carport structure area will total
    <input type="number" placeholder="0" min="0" step="50" id="carportArea"> square feet.
  </p>`,otherAreaText=`
  <p>The new other structure area will total
    <input type="number" placeholder="0" min="0" step="50" id="otherArea"> square feet.
  </p>`,occupCatText=`
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
  </p>`,remodelCostText='<p>The total value of my building costs, materials, and labor for my remodel (separate from any additions) is $ <input type="number" placeholder="-.--" id="remodelCost" min="0" step="50">.</p>',unitsText='There are <input type="number" placeholder="0" id="units" min="0" step="1"> units in this occupancy.',cnAreaText='<p>The total area for this type of occupancy is <input id="cnArea" type="number" placeholder="0" min="0" step="50"> square feet.</p>',constructionTypeText=`
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
  <p class="disclaimer">If you aren't sure, use VB</p>`,occupAddText='<span class="btn" id="occupAdd">There are more occupancy types</span>',warningText="<p class='warning'>Required fields are not entered</p>",mechValuationText=`
  <p>The estimated project valuation is
    <input class="mechValuation" type="number" placeholder="0" min="0">
  </p>
`,plmTypeText=`
  I'm working on a
    <select class="plmProjectType">
      <option></option>
      <option>residential</option>
      <option>commercial</option>
    </select> project.
  `,plmFixtureText=`
  <p>There are
    <input class="fixtureQuantity" type="number" placeholder="0" min="0"> fixtures being worked on.
  </p>
  <p>Fixtures may include water closets, basins, bathtubs, showers, sinks, laundry trays, water heaters, dishwashers, wash machines, urinals, backflow preventers, floor drains, drinking fountains, pressure reducing valves, sump pumps, floor sinks, mop sinks, grease traps, or others.</p>`,plmEstimationText=`
  <p>The estimated project valuation is
    <input class="plmValuation" type="number" placeholder="0" min="0">
  </p>
  `,barricadeIfText=`
  <p>I
    <select class="barricadeIf">
      <option></option>
      <option>will</option>
      <option>will not</option>
    </select> need a barricade for this work.
  </p>`,barricadeDaysText=`
  <p>I will be setting up a barricade for
    <input class="daysForBarricade" type="number" placeholder="0" min="0" max="31"> days.
  </p>`,rowRestorationText=`
  <p>This project
    <select class="rowRestoration">
      <option></option>
      <option>will</option>
      <option>will not</option>
    </select> require right-of-way restoration work.
  </p>`,sewerConnectionTypeText=`
  <p>I'll be
    <select class="connectionType">
      <option></option>
      <option>replacing</option>
      <option>adding</option>
      <option>repairing</option>
    </select> a side sewer.
  </p>`,waterConnectionTypeText=`
  <p>I'll be
    <select class="connectionType">
      <option></option>
      <option>replacing</option>
      <option>adding</option>
      <option>repairing</option>
    </select> a water service line.
  </p>`,dischargePointText=`
  <p>The discharge point for the storm connection is
    <select class="dischargePoint">
      <option></option>
      <option>a catch basin</option>
      <option>a manhole</option>
      <option>an on-site system</option>
      <option>a curb drain</option>
    </select>.
  </p>`,clearingOrGrading=`
  <p>This project will be
    <select class="clearingOrGrading">
      <option></option>
      <option>clearing</option>
      <option>grading</option>
    </select> the development area.
  </p>`,sdevFeeText=`
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
  </p>`,woFeeText=`<p>Work Order and Major SDEV Level 2 Fees are charged on an hourly basis and invoiced monthly, beginning during permit review:<br><br>
<b>Review/Inspection</b> - $190/hour<br>
<b>Emergency Preparedness Fund</b> - 5% of review/inspection hourly charges<br>
<b>Natural Resources Fund</b> - 5% of review/inspection hourly charges<br>
<b>Technology Fund</b> - 5% of review/inspection hourly charges<br>
<b>Reserve Fund</b> - 2% of review/inspection hourly charges<br><br>
Click <b>Next</b> to advance to the next selected permit type/final estimation.
</p>`,clearingAreaText=`
  <p>The total clearing area is
    <input type="number" id="clearingArea" min="0" step="50"> square feet.
  </p>`,pavedAreaText=`
  <p>The total paved area is
    <input type="number" id="pavedArea" min="0" step="50"> square feet.
  </p>`,signCostText=`
  <p>The total construction cost, including materials and labor, for the sign is $
    <input type="number" placeholder="-.--" id="signCost" min="0" step="50">.
  </p>`,demoTypeText=`
  <p>This structure being demolished is a
    <select id="demoType">
      <option></option>
      <option>residential</option>
      <option>commercial</option>
    </select> structure.
  </p>`,demoAccPlmText=`
  <p>There
    <select id="demoAcc">
      <option></option>
      <option>is</option>
      <option>is not</option>
    </select> plumbing serving the accessory structure.
  </p>`,luPermitTypeText=`
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
  </p>`,accDwellingSubtypeText=`
  <select id="luPermitSubtype">
    <option></option>
    <option>attached</option>
    <option>detached</option>
    <option>ADU reauthorization</option>
  </select>`,addExpandSubtypeText=`
  <select id="luPermitSubtype">
    <option></option>
    <option>100-400 feet (additional only)</option>
    <option>1000 feet</option>
    <option>2500 feet</option>
  </select>`,condUseSubtypeText=`
  <select id="luPermitSubtype">
    <option></option>
    <option>large scale retail</option>
    <option>correctional facility</option>
    <option>detention facility</option>
    <option>all others</option>
  </select>`,critAreaSubtypeText=`
  <select id="luPermitSubtype">
    <option></option>
    <option>activities allowed with staff review</option>
    <option>development permit</option>
    <option>minor development permit</option>
    <option>verification</option>
    <option>mitigation monitoring review</option>
  </select>`,DRASubtypeText=`
  <select id="luPermitSubtype">
    <option></option>
    <option>affordable housing (not in designated center) - 1 acre or more in size</option>
    <option>downtown regional growth center - landmarks historic structure</option>
    <option>downtown regional growth center - public ownership</option>
    <option>international financial services area (IFSA)</option>
    <option>public facility site - 5 acres or more in size</option>
    <option>tacoma mall neighborhood regional growth center - 2 acres or more in size</option>
    </select>`,envRevSubtypeText=`
  <select id="luPermitSubtype">
    <option></option>
    <option>environmental impact statement</option>
    <option>SEPA with a discretionary land use permit</option>
    <option>residential buildings (20+ units, under 12000 sf), signs, parking lots, misc actions</option>
    <option>residential buildings (20+ units, over 12000 sf), grading (over 500 cy)</option>
  </select>`,infReqSubtypeText=`
  <select id="luPermitSubtype">
    <option></option>
    <option>determination or interpretation by director</option>
    <option>zoning verification letter</option>
  </select>`,platsSubtypeText=`
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
  </select>`,shoreSubtypeText=`
  <select id="luPermitSubtype">
    <option></option>
    <option>single family</option>
    <option>exemption</option>
    <option>other</option>
    <option>revisions - single family</option>
    <option>revisions - other</option>
    <option>sign waiver</option>
    <option>extension</option>
  </select>`,varSubtypeText=`
  <select id="luPermitSubtype">
    <option></option>
    <option>height - main building</option>
    <option>height - accessory building</option>
    <option>single family residential</option>
    <option>other</option>
  </select>`,pages3rdQuestText=`
  <p>There are
    <input type="number" id="thirdQuest" min="2" step="1"> pages in this plat.
  </p>`,plats3rdQuestText=`
  <p>There are
    <input type="number" id="thirdQuest" min="2" step="1"> lots in this plat.
  </p>`,shore3rdQuestText=`
  <p>The total valuation of the shoreline work is
    <input type="number" placeholder="-.--" id="thirdQuest" min="0" step="100000">.
  </p>`,luAddText=`<span class="btn" id="luAdd">I'll need another permit</span>`,fireCategoriesText=`
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
  </p>`,fireAlarmText=`
  <p>Number of devices:
    <input type="number" min="0">
  </p>`,fireUnderground=`
  <p>Number of underground devices:
    <input type="number" min="0">
  </p>`,firePreEngText=`
  <p>Number of systems:
    <input type="number" id="firePreEngSys" min="0">
  </p>
  <p>Number of nozzles:
    <input type="number" id="firePreEngNoz" min="0">
  </p>`,fireKitchenText=`
  <p>Number of systems:
    <input type="number" min="0">
  </p>`,fireServMainsText=`
  <p>Number of hydrants, sprinkler supplies, and fire department connections:
    <input type="number" min="0">
  </p>`,fireSprinklerText=`
  <p>Number of heads:
    <input type="number" id="fireSprinklerHeads" min="0">
  </p>`,fireSuppressionText=`
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
  </p>`,eventTypeText=`
  <p>This organization hosting this event is
    <select id="eventOrgType">
      <option></option>
      <option>residential or non-profit</option>
      <option>commercial</option>
    </select>.
  </p>`,eventBlocksText=`
  <p>The number of blocks to close for the event will be
    <input type="number" id="eventBlocks" min="0">.
  </p>`,eventDateText=`
  <p>The date for the event will be
    <input type="date" id="eventDate">.
  </p>`,preTypeText=`
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
  `,rowTypeText=`
  <p>Project will involve
    <select id="rowType">
      <option></option>
      <option>construction within (RCON)</option>
      <option>occupancy of (ROCC)</option>
      <option>use of (RUSE)</option>
      <option>utility work in (RUTI)</option>
    </select> the right-of-way.
  </p>`,rowConstructionTypeText=`
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
  </p>`,rowOccupancyText=`
  <p>This permit is for: <p>
    <select id="rowOcc">
      <option></option>
      <option>residential</option>
      <option>commercial</option>
      <option>temporary sidewalk cafe</option>
      <option>sidewalk cafe</option>
      <option>ground water monitoring well</option>
    </select>
  </p>`,rowOccWellText=`
  <p>Amount of wells:
    <input type="number" id="rowWell" placeholder="0" min="1">
  </p>`,rowSidewalkWorkText=`
  <p>In this project, I will be
    <select id="rowSidewalkWork">
      <option></option>
      <option>adding a new</option>
      <option>replacing or repairing an existing</option>
    </select> sidewalk.
  </p>`,rowGutterText=`
  <p>There
    <select id="rowGutter">
      <option></option>
      <option>is</option>
      <option>is not</option>
    </select> an existing curb or gutter with this sidewalk.
  </p>`,rowSidewalkSizeText=`
  <p>The length of the sidewalk is
    <input type="number" id="rowSidewalkSize" placeholder="0" min="1" step="10"> feet. <br><b>(Calculation assumes sidewalk is 5ft wide)</b>
  </p>`,rowGutterLengthText=`
  <p>The total length of the curb or gutter is
    <input type="number" id="rowGutterLength" placeholder="0" min="1" step="10"> linear feet.
  </p>`,rowDrivewayText=`
  <p>There
    <select id="rowDriveway">
      <option></option>
      <option>is</option>
      <option>is not</option>
    </select> a driveway in this project.
  </p>`,rowDrivewayNumText=`
  <p>There are
    <input type="number" id="rowAsphaltDrivewayNum" placeholder="0" min="1"> asphalt driveways.
  </p>
  <p>There are
    <input type="number" id="rowConcreteDrivewayNum" placeholder="0" min="1"> concrete driveways.
  </p>`,rowPavingText=`
  <p>The paved area totals
    <input type="number" id="rowPaving" placeholder="0" min="1"> square feet.
  </p>`,rowTrenchTypeText=`
  <p>The trench is
    <select id="rowTrenchType">
      <option></option>
      <option>an open cut trench</option>
      <option>a monitoring well, a bore, or potholing</option>
    </select>.
  </p>`,rowTrenchLengthText=`
  <p>The total length of the trench is
    <input type="number" id="rowTrenchLength" placeholder="0" min="1" step="10"> linear feet.
  </p>`,rowBoreCountText=`
  <p>There are
    <input type="number" placeholder="0" id="rowBoreCount" min="1"> bores (not including geotechnical or directional bores).</p>`,rowUseDaysText=`
  <p>This project will use the right-of-way for
    <input type="number" id="rowUseDays" placeholder="0" min="1" step="7"> days.
  </p>`,rowBannerText=`
  <p>There
    <select id="rowBanner">
      <option></option>
      <option>will</option>
      <option>will not</option>
    </select> be a banner in this project.
  </p>`,rowBannerBlocksText=`
  <p>This banner spans
    <input type="number" id="rowBannerBlocks" placeholder="0" min="1"> blocks.
  </p>`,rowBannerInstallText=`
  <p>The banner will be installed by a
    <select id="rowBannerInstall">
      <option></option>
      <option>city</option>
      <option>private</option>
    </select> contractor.
  </p>`,rowSMVTypeText=`
  <p>This is
    <select id="rowSMVType">
      <option></option>
      <option>an annual</option>
      <option>a single trip</option>
      <option>a house move</option>
    </select> permit.
  </p>`,rowTrenchText=`
  <p>There
    <select id="rowTrench">
      <option></option>
      <option>will</option>
      <option>will not</option>
    </select> be a trench in this project.
  </p>`,rowBoresText=`
  <p>There
    <select id="rowBores">
      <option></option>
      <option>will</option>
      <option>will not</option>
    </select> be bores in this project.
  </p>`,rowUseTypeText=`
  <p>The use of this permit is for
    <select id="rowUse">
      <option></option>
      <option>a special motor vehicle</option>
      <option>overtime parking</option>
      <option>a banner</option>
    </select>.
  </p>`,signTypeText=`
  <p>The use of this permit is for
    <select id="rowUse">
      <option></option>
      <option>overtime parking</option>
    </select>.
  </p>`,rowHoliday=`
  <p>
    <input type="checkbox" name="holiday" id="rowHoliday">
    <label for="rowHoliday">This use includes holiday decorations.</label>
  </p>`,pg1and2instructions=`
  <p><b>This fee estimator is intended for informational purposes only</b> and will help you estimate what your building permit fee will be.
  </p>
  <p>Click on the <span class="underline">underlined blank spaces</span> in the sentences below to select from a dropdown menu of choices or enter a number value based off of what fits in the sentence.
  </p>
  <p>Hover over <span class="green">green</span> question marks to get more information about the item next to the icon.
  </p>
  <p>If you need help, click on the <span class="green">Technical Issues</span> button at the bottom of the page and describe the problem above the dotted line.
  </p>`,pg3disclaimer=`
  <div class="disclaimer">This fee estimator is intended for informational purposes only, and currently available for limited permit types. Please note, complete identification of all required permits and final fee calculations will be completed during the processing of a permit application.</div>`,permitFeeDetails=`
  <div class="fee-sub-items">
  </div>`,feeDetailsVar=[`<p class="base">Base permit fee:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>The <b>base permit fee</b> includes the fees associated with the fields you filled out on the last page.</b>
      </div>
    </div>
  </span>`,`<p class="techFund">Technology Fund:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>Technology operations and modernization in support of permitting and development services.
      </div>
    </div>
  </span>`,`<p class="emergencyFund">Emergency Preparedness Fund:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>Support emergency preparedness programs related to buildings, structures, and associated site development.
      </div>
    </div>
  </span>`,`<p class="resourceFund">Natural Resource Fund:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>Protection of natural resources in and surrounding the City.
      </div>
    </div>
  </span>`,`<p class="reserveFund">Reserve Fund:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>Providing adequate reserve funds for maintaining permit services during periods of economic fluctuation or other unanticipated needs.
      </div>
    </div>
  </span>`,`<p class="state">State building fee:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>The <b>state building fee</b> is calculated by staff, the indicated amount is the base cost based on permit type.
      </div>
    </div>
  </span>`,`<p class="review">Plan review fee:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>The cost of reviewing submitted plans for required for permit.
      </div>
    </div>
  </span>`,`<p class="annual">Annual Renewal fee:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>Yearly fee that includes site inspection for compliance, file review, insurance review, and application of fee escalators/adjustments as required. An annual statement will be sent to the property owner on a yearly basis, but is not required at the time of submittal.
      </div>
    </div>
  </span>`,`<p class="useFee">Use fee:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>Groundwater monitoring wells have a set use fee of $175 for the first well and $150 for each additional well. A billing statement will be sent following the execution of the permit and then annually until the permit has been released. See Tacoma Municipal Code 9.08.075 for additional details.
      </div>
    </div>
  </span>`,`<p class="bonding">Bonding Requirement:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>Groundwater monitoring wells require a bond with the City in the amount of $10,000 for each well authorized.  The bonding requirement must be met prior to issuance of the Right-of-Way Occupancy Permit, but is not required at the time of submittal.  See http://tacomapermits.org/rocc-permits for additional details and forms.
      </div>
    </div>
  </span>`,`<p class="siteFee">Site Development Fee:
    <span class="money"></span>
  </p>`,`<p class="sitePlanrev">Site Plan Review:
    <span class="money"></span>
  </p>`,`<p class="barricadeFee">Barricade Fee:
    <span class="money"></span>
  </p>`,`<p class="rowFee">Patch Inspection Fee:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>A Patch Inspection Fee is required when a project involves right-of-way restoration.
      </div>
    </div>
  </span>`,`<p class="preFee">Pre-Development Fee:
    <span class="money"></span>
  </p>
  <span class="tooltip-wrapper last-page">
    <i class="fa fa-question tooltip-pointer" aria-hidden="true"></i>
    <div class="tooltip">
      <div>The fees for the pre-development service will be paid prior to the initial review and prior to any follow up meeting. However, if the project moves into permitting, PDS will credit up to 100% of the pre-development fees towards the plan review fees for the associated building permit.</div>
    </div>
  </span>`];function showError(e,t){e.addClass("shake"),setTimeout(function(){e.removeClass("shake")},500),t.addClass("look-here"),setTimeout(function(){t.removeClass("look-here")},500)}function putIn(e,t){e.show().addClass("fade").html(t)}function takeOut(e){e.hide().removeClass("fade").html("")}function bldPermit(){$("#pgbld .question").hide(),putIn($("#pgbld h3"),"Building"),putIn($("#pgbld .q1"),projectTypeText),$("#pgbld .q1 select").change(function(){takeOut($("#pgbld .q2, #pgbld .q3, #pgbld .q4, #pgbld .q5, #pgbld .q6, #pgbld .q7, #pgbld .q8")),"residential"==$("#project-type-1").val()?projectType1="R":"commercial"==$("#project-type-1").val()&&(projectType1="C"),"a new building"==$("#project-type-2").val()?projectType2="N":"a remodel on an existing building"==$("#project-type-2").val()?projectType2="R":"adding to an existing building"==$("#project-type-2").val()?projectType2="A":"both a remodel and an addition"==$("#project-type-2").val()&&(projectType2="B"),""!=$("#project-type-1").val()&&""!=$("#project-type-2").val()&&("RN"==(projectType=projectType1+projectType2)||"RA"==projectType?(putIn($("#pgbld .q2"),structureTypeText),$("#structureType").change(function(){takeOut($("#pgbld .q3, #pgbld .q4, #pgbld .q5, #pgbld .q6, #pgbld .q7, #pgbld .q8")),"a single family home"==$(this).val()||"a duplex"==$(this).val()?(putIn($("#pgbld .q3"),livingSpaceText),$("#livingSpaceArea").bind("click keyup",function(){2e3<$(this).val()?$(".veneer").show():($("#veneerChoice").val("No"),$(".veneer").hide())})):"an accessory structure"==$(this).val()?putIn($("#pgbld .q3"),accessoryText):takeOut($("#pgbld .q4, #pgbld .q5, #pgbld .q6, #pgbld .q7, #pgbld .q8")),$("#garageCheck").change(function(){$(this).is(":checked")?putIn($("#pgbld .q4"),garageAreaText):takeOut($("#pgbld .q4"))}),$("#carportCheck").change(function(){$(this).is(":checked")?putIn($("#pgbld .q5"),carportAreaText):takeOut($("#pgbld .q5"))}),$("#otherCheck").change(function(){$(this).is(":checked")?putIn($("#pgbld .q6"),otherAreaText):takeOut($("#pgbld .q6"))})})):"RR"==projectType||"CR"==projectType?putIn($("#pgbld .q2"),remodelCostText):"CN"==projectType||"CA"==projectType?(occupRows=[],numUnits=0,putIn($("#pgbld .q2"),occupCatText),putIn($("#pgbld .q3"),cnAreaText),putIn($("#pgbld .q4"),constructionTypeText),putIn($("#pgbld .q7"),occupAddText),takeOut($("#pgbld .q5, #pgbld .q6, #pgbld .q8")),$("#occupCat").change(function(){if($(this).val().match("^R")?putIn($("#pgbld .q5"),unitsText):takeOut($("#pgbld .q5")),putIn($("#pgbld .q3"),cnAreaText),putIn($("#pgbld .q4"),constructionTypeText),putIn($("#pgbld .q7"),occupAddText),0<occupRows.length){putIn($("#pgbld .q6"),'<table id="occupTable"><tr><th>Occupancy type:</th><th>Construction type:</th><th>Area (sq. ft.):</th></tr></table>');for(let e=0;e<occupRows.length;e+=3)$("#occupTable").append("<tr><td>"+occupRows[e]+"</td><td>"+occupRows[e+1]+"</td><td>"+occupRows[e+2]+"</td></tr>")}else takeOut($("#pgbld .q6"));$("#occupAdd").click(function(){if(""!=$("#occupCat").val()&&""!=$("#constructionType").val()&&0<$("#cnArea").val()){occupRows.push($("#occupCat").val(),$("#constructionType").val(),$("#cnArea").val()),$("#units").val()&&(numUnits+=parseInt($("#units").val())),putIn($("#pgbld .q6"),'<table id="occupTable"><tr><th>Occupancy type:</th><th>Construction type:</th><th>Area (sq. ft.):</th></tr></table>');for(let e=0;e<occupRows.length;e+=3)$("#occupTable").append("<tr><td>"+occupRows[e]+"</td><td>"+occupRows[e+1]+"</td><td>"+occupRows[e+2]+"</td></tr>");$("#occupCat").val(""),putIn($("#pgbld .q3"),cnAreaText),putIn($("#pgbld .q4"),constructionTypeText),takeOut($("#pgbld .q5"))}else showError($(this),$("#occupCat, #cnArea, #constructionType, #pgbld .q4 input"))})})):"RB"==projectType?(putIn($("#pgbld .q2"),structureTypeText),putIn($("#pgbld .q7"),remodelCostText),$("#pgbld .q2 select").change(function(){takeOut($("#pgbld .q4, #pgbld .q5, #pgbld .q6")),"a single family home"==$(this).val()||"a duplex"==$(this).val()?putIn($("#pgbld .q3"),livingSpaceText):"an accessory structure"==$(this).val()&&putIn($("#pgbld .q3"),accessoryText),$("#garageCheck").change(function(){$(this).is(":checked")?putIn($("#pgbld .q4"),garageAreaText):takeOut($("#pgbld .q4"))}),$("#carportCheck").change(function(){$(this).is(":checked")?putIn($("#pgbld .q5"),carportAreaText):takeOut($("#pgbld .q5"))}),$("#otherCheck").change(function(){$(this).is(":checked")?putIn($("#pgbld .q6"),otherAreaText):takeOut($("#pgbld .q6"))})})):"CB"==projectType&&(putIn($("#pgbld .q2"),"<h4>Addition:</h4>"+occupCatText),putIn($("#pgbld .q3"),cnAreaText),putIn($("#pgbld .q4"),constructionTypeText),putIn($("#pgbld .q7"),occupAddText),putIn($("#pgbld .q8"),"<h4>Remodel:</h4>"+remodelCostText),takeOut($("#pgbld .q5, #pgbld .q6")),$("#occupCat").change(function(){if($(this).val().match("^R")?putIn($("#pgbld .q5"),unitsText):takeOut($("#pgbld .q5")),putIn($("#pgbld .q3"),cnAreaText),putIn($("#pgbld .q4"),constructionTypeText),putIn($("#pgbld .q7"),occupAddText),0<occupRows.length){putIn($("#pgbld .q6"),'<table id="occupTable"></table>'),$("#occupTable").html("<tr><th>Occupancy type:</th><th>Construction type:</th><th>Area (sq. ft.):</th></tr>");for(let e=0;e<occupRows.length;e+=3)$("#occupTable").append("<tr><td>"+occupRows[e]+"</td><td>"+occupRows[e+1]+"</td><td>"+occupRows[e+2]+"</td></tr>")}else takeOut($("#pgbld .q5"));$("#occupAdd").click(function(){if(""!=$("#occupCat").val()&&""!=$("#constructionType").val()&&0<$("#cnArea").val()){occupRows.push($("#occupCat").val(),$("#constructionType").val(),$("#cnArea").val()),numUnits+=parseInt($("#units").val()),putIn($("#pgbld .q6"),'<table id="occupTable"></table>'),$("#occupTable").html("<tr><th>Occupancy type:</th><th>Construction type:</th><th>Area (sq. ft.):</th></tr>");for(let e=0;e<occupRows.length;e+=3)$("#occupTable").append("<tr><td>"+occupRows[e]+"</td><td>"+occupRows[e+1]+"</td><td>"+occupRows[e+2]+"</td></tr>");$("#occupCat").val(""),putIn($("#pgbld .q3"),cnAreaText),putIn($("#pgbld .q4"),constructionTypeText),takeOut($("#pgbld .q5"))}else showError($(this),$("#occupCat, #cnArea, #constructionType, #pgbld .q4 input"))})})))})}function wtrPermit(){$("#pgwtr .question").hide(),putIn($("#pgwtr h3"),"Water"),putIn($("#pgwtr .q1"),waterConnectionTypeText),putIn($("#pgwtr .q2"),rowRestorationText),putIn($("#pgwtr .q3"),barricadeIfText),$(".barricadeIf").change(function(){"will"==$(this).val()?putIn($("#pgwtr .q4"),barricadeDaysText):takeOut($("#pgwtr .q4"))})}function plmPermit(){$("#pgplm .question").hide(),putIn($("#pgplm h3"),"Plumbing"),putIn($("#pgplm .q1"),plmTypeText),$(".plmProjectType").change(function(){"residential"==$(this).val()?putIn($("#pgplm .q2"),plmEstimationText):"commercial"==$(this).val()?putIn($("#pgplm .q2"),plmFixtureText):takeOut($("#pgplm .q2"))})}function mechPermit(){$("#pgmech .question").hide(),putIn($("#pgmech h3"),"Residential Mechanical"),putIn($("#pgmech .q1"),mechValuationText)}function stormPermit(){$("#pgstorm .question").hide(),putIn($("#pgstorm h3"),"Surfacewater"),putIn($("#pgstorm .q1"),dischargePointText),putIn($("#pgstorm .q2"),rowRestorationText),putIn($("#pgstorm .q3"),barricadeDaysText)}function sewerPermit(){$("#pgsewer .question").hide(),putIn($("#pgsewer h3"),"Wastewater"),putIn($("#pgsewer .q1"),sewerConnectionTypeText),putIn($("#pgsewer .q2"),rowRestorationText),putIn($("#pgsewer .q3"),barricadeDaysText)}function sitedevPermit(){$("#pgsitedev .question").hide(),putIn($("#pgsitedev h3"),"Site Development"),putIn($("#pgsitedev .q1"),sdevFeeText)}function woPermit(){$("#pgwo .question").hide(),putIn($("#pgwo h3"),"Work Order"),putIn($("#pgwo .q1"),woFeeText)}function signPermit(){$("#pgsign .question").hide(),putIn($("#pgsign h3"),"Sign"),putIn($("#pgsign .q1"),signCostText),putIn($("#pgsign .q2"),barricadeIfText),$("#pgsign .barricadeIf").change(function(){"will"==$(this).val()?putIn($("#pgsign .q3"),barricadeDaysText):takeOut($("#pgsign .q3"))}),putIn($("#pgsign .q4"),signTypeText),$("#rowUse").change(function(){takeOut($("#pgsign .q5, #pgrow .q6")),"overtime parking"==$(this).val()&&putIn($("#pgsign .q5"),rowUseDaysText)})}function demoPermit(){$("#pgdemo .question").hide(),putIn($("#pgdemo h3"),"Demolition"),putIn($("#pgdemo .q1"),demoTypeText),$("#demoType").change(function(){$("#demoAcc").change(function(){"is"==$(this).val()?putIn($("#pgdemo .q3"),demoAccPlmText):takeOut($("#pgdemo .q3"))})})}function landPermit(){useRows=[],$("#pgland .question").hide(),putIn($("#pgland h3"),"Land Use"),putIn($("#pgland .q1"),luPermitTypeText),putIn($("#pgland .q5"),luAddText),$("#luPermitType").change(function(){""==$(this).val()||"major modification of permit"==$(this).val()||"open space use classification"==$(this).val()||"site approval"==$(this).val()||"site rezone/reclassification"==$(this).val()||"special development permit"==$(this).val()||"temporary homeless camp"==$(this).val()||"waiver"==$(this).val()?takeOut($("#pgland .q2")):"accessory dwelling unit"==$(this).val()?putIn($("#pgland .q2"),"<p>The related subcategory is "+accDwellingSubtypeText+".</p>"):"additional/expanded notice"==$(this).val()?putIn($("#pgland .q2"),"<p>The related subcategory is "+addExpandSubtypeText+".</p>"):"conditional use"==$(this).val()?putIn($("#pgland .q2"),"<p>The related subcategory is "+condUseSubtypeText+".</p>"):"critical areas"==$(this).val()?putIn($("#pgland .q2"),"<p>The related subcategory is "+critAreaSubtypeText+".</p>"):"development regulation agreement"==$(this).val()?putIn($("#pgland .q2"),"<p>The related subcategory is "+DRASubtypeText+".</p>"):"environmental review"==$(this).val()?putIn($("#pgland .q2"),"<p>The related subcategory is "+envRevSubtypeText+".</p>"):"information requests"==$(this).val()?putIn($("#pgland .q2"),"<p>The related subcategory is "+infReqSubtypeText+".</p>"):"plats / BLAs / segregations / combinations"==$(this).val()?putIn($("#pgland .q2"),"<p>The related subcategory is "+platsSubtypeText+".</p>"):"shoreline"==$(this).val()?putIn($("#pgland .q2"),"<p>The related subcategory is "+shoreSubtypeText+".</p>"):"variance"==$(this).val()&&putIn($("#pgland .q2"),"<p>The related subcategory is "+varSubtypeText+".</p>"),takeOut($("#pgland .q3")),$("#luPermitSubtype").change(function(){var e=$("#luPermitType").val(),t=$(this).val();"GIS drafting (New Plats)"==t||"GIS drafting (New Short Plat or BLA)"==t?(putIn($("#pgland .q3"),plats3rdQuestText),$("#thirdQuest").change(function(){lots=$(this).val()})):"E-Vault scanning and indexing"==t?(putIn($("#pgland .q3"),pages3rdQuestText),$("#thirdQuest").change(function(){pages=$(this).val()})):"shoreline"==e&&"other"==t?(putIn($("#pgland .q3"),shore3rdQuestText),$("#thirdQuest").change(function(){shoreval=$(this).val()})):takeOut($("#pgland .q3"))})}),$("#luAdd").click(function(){var e=!1;if(""!=$("#luPermitType").val()&&""!=$("#luPermitSubtype").val()?(useRows.push($("#luPermitType").val()),useRows.push($("#luPermitSubtype").val()),e=!0):""!=$("#luPermitType").val()&&""!=$("#luPermitSubtype").val()||(e=!1,showError($(this),$("#luPermitType, #luPermitSubtype, #pgland .q3 input"))),e){for(putIn($("#pgland .q4"),'<table id="useTable"><tr><th>Use type:</th><th>Subtype:</th></tr></table>'),i=0;i<useRows.length;i+=2)$("#useTable").append("<tr><td>"+useRows[i]+"</td><td>"+useRows[i+1]+"</td></tr>");$("#luPermitType").val(""),takeOut($("#pgland .q2, #pgland .q3"))}})}function firePermit(){$("#pgfire .question").hide(),putIn($("#pgfire h3"),"Fire"),putIn($("#pgfire .q1"),fireCategoriesText),$("#fireCategories").change(function(){"fire alarms"==$(this).val()?putIn($("#pgfire .q2"),fireAlarmText):"pre-engineered systems"==$(this).val()?putIn($("#pgfire .q2"),firePreEngText):"kitchen hood suppression systems"==$(this).val()?putIn($("#pgfire .q2"),fireKitchenText):"private fire service mains and their appurtenances"==$(this).val()?putIn($("#pgfire .q2"),fireServMainsText):"fire sprinkler tenant improvement"==$(this).val()?putIn($("#pgfire .q2"),fireSprinklerText):"underground fire systems"==$(this).val()?putIn($("#pgfire .q2"),fireUnderground):"new water based fire suppression systems"==$(this).val()?putIn($("#pgfire .q2"),fireSuppressionText):takeOut($("#pgfire .q2"))})}function eventPermit(){$("#pgevent .question").hide(),putIn($("#pgevent h3"),"Special Event"),putIn($("#pgevent .q1"),eventTypeText),putIn($("#pgevent .q2"),eventBlockText),putIn($("#pgevent .q3"),eventDateText);var e=(i=new Date).getDate(),t=i.getMonth()+1,i=i.getFullYear()+"-"+(t=t<10?"0"+t:t)+"-"+(e=e<10?"0"+e:e);$('input[type="date"]').attr("min",i)}function prePermit(){$("#pgpre .question").hide(),putIn($("#pgpre h3"),"Pre-Development Services"),putIn($("#pgpre .q1"),preTypeText)}function rowPermit(){$("#pgrow .question").hide(),putIn($("#pgrow h3"),"Right-of-Way"),putIn($("#pgrow .q1"),rowTypeText),$("#rowType").change(function(){takeOut($("#pgrow .q4, #pgrow .q5, #pgrow .q6, #pgrow .q7, #pgrow .q8, #pgrow .q9, #pgrow .q10, #pgrow .q11")),"construction within (RCON)"==$(this).val()?(putIn($("#pgrow .q2"),barricadeIfText),$("#pgrow .barricadeIf").change(function(){"will"==$(this).val()?putIn($("#pgrow .q3"),barricadeDaysText):takeOut($("#pgrow .q3"))}),putIn($("#pgrow .q4"),rowConstructionTypeText),$("#rconSidewalk").change(function(){$(this).is(":checked")?(putIn($("#pgrow .q5"),rowSidewalkWorkText),putIn($("#pgrow .q6"),rowSidewalkSizeText)):takeOut($("#pgrow .q5, #pgrow .q6"))}),$("#rconDriveway").change(function(){$(this).is(":checked")?putIn($("#pgrow .q7"),rowDrivewayNumText):takeOut($("#pgrow .q7"))}),$("#rconCurb").change(function(){$(this).is(":checked")?putIn($("#pgrow .q8"),rowGutterLengthText):takeOut($("#pgrow .q8"))}),$("#rconTrenchBore").change(function(){$(this).is(":checked")?(putIn($("#pgrow .q9"),rowTrenchTypeText),$("#rowTrenchType").change(function(){"an open cut trench"==$(this).val()?putIn($("#pgrow .q10"),rowTrenchLengthText):"a monitoring well, a bore, or potholing"==$(this).val()?putIn($("#pgrow .q10"),rowBoreCountText):takeOut($("#pgrow .q10"))})):takeOut($("#pgrow .q9, #pgrow .q10"))}),$("#addPaveArea").change(function(){$(this).is(":checked")?putIn($("#pgrow .q11"),rowPavingText):takeOut($("#pgrow .q11"))})):"occupancy of (ROCC)"==$(this).val()?(takeOut($("#pgrow .q2")),putIn($("#pgrow .q4"),rowOccupancyText),$("#rowOcc").change(function(){takeOut($("#pgrow .q5, #pgrow .q6")),"ground water monitoring well"==$(this).val()&&putIn($("#pgrow .q5"),rowOccWellText)})):"use of (RUSE)"==$(this).val()?(putIn($("#pgrow .q2"),barricadeIfText),$("#pgrow .barricadeIf").change(function(){"will"==$(this).val()?putIn($("#pgrow .q3"),barricadeDaysText):takeOut($("#pgrow .q3"))}),putIn($("#pgrow .q4"),rowUseTypeText),putIn($("#pgrow .q7"),rowHoliday),$("#rowUse").change(function(){takeOut($("#pgrow .q5, #pgrow .q6")),"a special motor vehicle"==$(this).val()?putIn($("#pgrow .q5"),rowSMVTypeText):"overtime parking"==$(this).val()?putIn($("#pgrow .q5"),rowUseDaysText):"a banner"==$(this).val()&&(putIn($("#pgrow .q5"),rowBannerBlocksText),putIn($("#pgrow .q6"),rowBannerInstallText))})):"utility work in (RUTI)"==$(this).val()&&(putIn($("#pgrow .q2"),barricadeIfText),$("#pgrow .barricadeIf").change(function(){"will"==$(this).val()?putIn($("#pgrow .q3"),barricadeDaysText):takeOut($("#pgrow .q3"))}),putIn($("#pgrow .q4"),rowTrenchText),$("#rowTrench").change(function(){"will"==$(this).val()?putIn($("#pgrow .q5"),rowTrenchLengthText):takeOut($("#pgrow .q5"))}),putIn($("#pgrow .q6"),rowBoresText),$("#rowBores").change(function(){"will"==$(this).val()?putIn($("#pgrow .q7"),rowBoreCountText):takeOut($("#pgrow .q7"))}))})}function back(){"pglast"==$(".question-box.active").attr("id")?(readyForLastPage=!1,currentPermit=permits[permits.length-1],$("#pgmid-pointer").removeClass("post"),$(".description").removeClass("open").removeClass("disclaimer").html(pg1and2instructions),$("#pglast, .tab-links li").removeClass("active"),$("#pg"+currentPermit+", #pgmid-pointer").addClass("active")):"pgbld"==$(".question-box.active").attr("id")?backPermit("bld"):"pgplm"==$(".question-box.active").attr("id")?backPermit("plm"):"pgmech"==$(".question-box.active").attr("id")?backPermit("mech"):"pgsewer"==$(".question-box.active").attr("id")?backPermit("sewer"):"pgwtr"==$(".question-box.active").attr("id")?backPermit("wtr"):"pgstorm"==$(".question-box.active").attr("id")?backPermit("storm"):"pgsitedev"==$(".question-box.active").attr("id")?backPermit("sitedev"):"pgwo"==$(".question-box.active").attr("id")?backPermit("wo"):"pgsign"==$(".question-box.active").attr("id")?backPermit("sign"):"pgdemo"==$(".question-box.active").attr("id")?backPermit("demo"):"pgland"==$(".question-box.active").attr("id")?backPermit("land"):"pgfire"==$(".question-box.active").attr("id")?backPermit("fire"):"pgevent"==$(".question-box.active").attr("id")?backPermit("event"):"pgrow"==$(".question-box.active").attr("id")?backPermit("row"):"pgpre"==$(".question-box.active").attr("id")&&backPermit("pre"),occupRows=[]}function next(){"pgbld"==$(".question-box.active").attr("id")?bldPageNext():"pgplm"==$(".question-box.active").attr("id")?plmPageNext():"pgmech"==$(".question-box.active").attr("id")?mechPageNext():"pgsewer"==$(".question-box.active").attr("id")?sewerPageNext():"pgwtr"==$(".question-box.active").attr("id")?wtrPageNext():"pgstorm"==$(".question-box.active").attr("id")?stormPageNext():"pgsitedev"==$(".question-box.active").attr("id")?sitePageNext():"pgwo"==$(".question-box.active").attr("id")?woPageNext():"pgsign"==$(".question-box.active").attr("id")?signPageNext():"pgdemo"==$(".question-box.active").attr("id")?demoPageNext():"pgland"==$(".question-box.active").attr("id")?landPageNext():"pgfire"==$(".question-box.active").attr("id")?firePageNext():"pgevent"==$(".question-box.active").attr("id")?eventPageNext():"pgrow"==$(".question-box.active").attr("id")?rowPageNext():"pgpre"==$(".question-box.active").attr("id")?prePageNext():"pgfirst"==$(".question-box.active").attr("id")?firstPageNext():"pglast"==$(".question-box.active").attr("id")&&lastPageNext()}function firstPageNext(){if(permits=[],$("#bldCheck").is(":checked")&&permits.push("bld"),$("#plmCheck").is(":checked")&&permits.push("plm"),$("#mechCheck").is(":checked")&&permits.push("mech"),$("#sewerCheck").is(":checked")&&permits.push("sewer"),$("#wtrCheck").is(":checked")&&permits.push("wtr"),$("#stormCheck").is(":checked")&&permits.push("storm"),$("#sitedevCheck").is(":checked")&&permits.push("sitedev"),$("#woCheck").is(":checked")&&permits.push("wo"),$("#signCheck").is(":checked")&&permits.push("sign"),$("#demoCheck").is(":checked")&&permits.push("demo"),$("#landCheck").is(":checked")&&permits.push("land"),$("#fireCheck").is(":checked")&&permits.push("fire"),$("#eventCheck").is(":checked")&&permits.push("event"),$("#rowCheck").is(":checked")&&permits.push("row"),$("#preCheck").is(":checked")&&permits.push("pre"),$('input[type="checkbox"]').is(":checked")){for(var e in $(".description").removeClass("open"),$("#pgfirst, .tab-links li").removeClass("active"),$("#pgfirst-pointer").addClass("post"),$("#details-num").text(" (1/"+permits.length+")"),permits)0==e&&(activePermit=permits[e]),"bld"==permits[e]?($('<article id="pgbld" class="question-box"></article>').insertBefore("#pglast"),$("#pgbld").html(basicPage),$("#pgmid-pointer").addClass("active"),$("#pgbld .question").hide()):"plm"==permits[e]?($('<article id="pgplm" class="question-box"></article>').insertBefore("#pglast"),$("#pgplm").html(basicPage),$("#pgmid-pointer").addClass("active"),$("#pgplm .question").hide()):"mech"==permits[e]?($('<article id="pgmech" class="question-box"></article>').insertBefore("#pglast"),$("#pgmech").html(basicPage),$("#pgmid-pointer").addClass("active"),$("#pgmech .question").hide()):"sewer"==permits[e]?($('<article id="pgsewer" class="question-box"></article>').insertBefore("#pglast"),$("#pgsewer").html(basicPage),$("#pgmid-pointer").addClass("active"),$("#pgsewer .question").hide()):"wtr"==permits[e]?($('<article id="pgwtr" class="question-box"></article>').insertBefore("#pglast"),$("#pgwtr").html(basicPage),$("#pgmid-pointer").addClass("active"),$("#pgwtr .question").hide()):"storm"==permits[e]?($('<article id="pgstorm" class="question-box"></article>').insertBefore("#pglast"),$("#pgstorm").html(basicPage),$("#pgmid-pointer").addClass("active"),$("#pgstorm .question").hide()):"sitedev"==permits[e]?($('<article id="pgsitedev" class="question-box"></article>').insertBefore("#pglast"),$("#pgsitedev").html(basicPage),$("#pgmid-pointer").addClass("active"),$("#pgsitedev .question").hide()):"wo"==permits[e]?($('<article id="pgwo" class="question-box"></article>').insertBefore("#pglast"),$("#pgwo").html(basicPage),$("#pgmid-pointer").addClass("active"),$("#pgwo .question").hide()):"sign"==permits[e]?($('<article id="pgsign" class="question-box"></article>').insertBefore("#pglast"),$("#pgsign").html(basicPage),$("#pgmid-pointer").addClass("active"),$("#pgsign .question").hide()):"demo"==permits[e]?($('<article id="pgdemo" class="question-box"></article>').insertBefore("#pglast"),$("#pgdemo").html(basicPage),$("#pgmid-pointer").addClass("active"),$("#pgdemo .question").hide()):"land"==permits[e]?($('<article id="pgland" class="question-box"></article>').insertBefore("#pglast"),$("#pgland").html(basicPage),$("#pgmid-pointer").addClass("active"),$("#pgland .question").hide()):"fire"==permits[e]?($('<article id="pgfire" class="question-box"></article>').insertBefore("#pglast"),$("#pgfire").html(basicPage),$("#pgmid-pointer").addClass("active"),$("#pgfire .question").hide()):"event"==permits[e]?($('<article id="pgevent" class="question-box"></article>').insertBefore("#pglast"),$("#pgevent").html(basicPage),$("#pgmid-pointer").addClass("active"),$("#pgevent .question").hide()):"row"==permits[e]?($('<article id="pgrow" class="question-box"></article>').insertBefore("#pglast"),$("#pgrow").html(basicPage),$("#pgmid-pointer").addClass("active"),$("#pgrow .question").hide()):"pre"==permits[e]&&($('<article id="pgpre" class="question-box"></article>').insertBefore("#pglast"),$("#pgpre").html(basicPage),$("#pgpre-pointer").addClass("active"),$("#pgpre .question").hide());"bld"==activePermit?($("#pgbld").addClass("active"),bldPermit()):"plm"==activePermit?($("#pgplm").addClass("active"),plmPermit()):"mech"==activePermit?($("#pgmech").addClass("active"),mechPermit()):"sewer"==activePermit?($("#pgsewer").addClass("active"),sewerPermit()):"wtr"==activePermit?($("#pgwtr").addClass("active"),wtrPermit()):"storm"==activePermit?($("#pgstorm").addClass("active"),stormPermit()):"sitedev"==activePermit?($("#pgsitedev").addClass("active"),sitedevPermit()):"wo"==activePermit?($("#pgwo").addClass("active"),woPermit()):"sign"==activePermit?($("#pgsign").addClass("active"),signPermit()):"demo"==activePermit?($("#pgdemo").addClass("active"),demoPermit()):"land"==activePermit?($("#pgland").addClass("active"),landPermit()):"fire"==activePermit?($("#pgfire").addClass("active"),firePermit()):"event"==activePermit?($("#pgevent").addClass("active"),eventPermit()):"row"==activePermit?($("#pgrow").addClass("active"),rowPermit()):"pre"==activePermit&&($("#pgpre").addClass("active"),prePermit())}else showError($(this),$("#pgfirst input"))}function bldPageNext(){readyforNextPage=!1,"RN"==projectType||"RA"==projectType?("a single family home"==$("#structureType").val()||"a duplex"==$("#structureType").val()?$.each($("#pgbld .q3 input"),function(){$(this).val()&&(readyforNextPage=!0)}):"an accessory structure"==$("#structureType").val()&&($("#garageCheck").is(":checked")&&0<$("#garageArea").val()&&(readyforNextPage=!0),$("#carportCheck").is(":checked")&&0<$("#carportArea").val()&&(readyforNextPage=!0),$("#otherCheck").is(":checked"))&&0<$("#otherArea").val()&&(readyforNextPage=!0),readyforNextPage?(structureType=$("#structureType").val(),livingSpaceArea=$("#livingSpaceArea").val(),garageArea=$("#garageArea").val(),premanArea=$("#premanArea").val(),basementArea=$("#basementArea").val(),deckArea=$("#deckArea").val()):showError($("#pgbld .next"),$("#pgbld input, #pgbld select"))):"RR"==projectType||"CR"==projectType?($("#remodelCost").val()?readyforNextPage=!0:showError($("#pgbld .next"),$("#pgbld input, #pgbld select")),readyforNextPage&&(remodelCost=$("#remodelCost").val())):"CN"==projectType||"CA"==projectType?$("#pgbld input, #pgbld select").val()?(numUnits+=parseInt($("#units").val()),0<occupRows.length?(""!=$("#occupCat").val()&&""!=$("#constructionType").val()&&0<$("#cnArea").val()&&occupRows.push($("#occupCat").val(),$("#constructionType").val(),$("#cnArea").val()),readyforNextPage=!0):0==occupRows.length&&""!=$("#occupCat").val()&&""!=$("#constructionType").val()&&0<$("#cnArea").val()&&(occupRows.push($("#occupCat").val(),$("#constructionType").val(),$("#cnArea").val()),readyforNextPage=!0)):showError($("#pgbld .next"),$("#pgbld input, #pgbld select")):"RB"==projectType?($("#remodelCost").val()&&("a single family home"==$("#structureType").val()||"a duplex"==$("#structureType").val()?$.each($("#pgbld .q3 input"),function(){$(this).val()&&(readyforNextPage=!0)}):"an accessory structure"==$("#structureType").val()&&($("#garageCheck").is(":checked")&&0<$("#garageArea").val()&&(readyforNextPage=!0),$("#carportCheck").is(":checked")&&0<$("#carportArea").val()&&(readyforNextPage=!0),$("#otherCheck").is(":checked"))&&0<$("#otherArea").val()&&(readyforNextPage=!0)),readyforNextPage?(structureType=$("#structureType").val(),livingSpaceArea=$("#livingSpaceArea").val(),garageArea=$("#garageArea").val(),premanArea=$("#premanArea").val(),basementArea=$("#basementArea").val(),deckArea=$("#deckArea").val()):showError($("#pgbld .next"),$("#pgbld input, #pgmid select"))):"CB"==projectType&&($("#pgbld input, #pgbld select").val()&&$("#remodelCost").val()?(numUnits+=parseInt($("#units").val()),0<occupRows.length?(""!=$("#occupCat").val()&&""!=$("#constructionType").val()&&0<$("#cnArea").val()&&occupRows.push($("#occupCat").val(),$("#constructionType").val(),$("#cnArea").val()),readyforNextPage=!0):0==occupRows.length&&""!=$("#occupCat").val()&&""!=$("#constructionType").val()&&(occupRows.push($("#occupCat").val(),$("#constructionType").val(),$("#cnArea").val()),readyforNextPage=!0)):showError($("#pgbld .next"),$("#pgbld input, #pgbld select"))),readyforNextPage&&("bld"==permits[permits.length-1]?finalPage():(currentPermit=permits[$.inArray("bld",permits)+1],$("#pgbld").removeClass("active"),$("#pg"+currentPermit).addClass("active"),nextPermit(currentPermit)))}function wtrPageNext(){"will"==$("#pgwtr .barricadeIf").val()?0<$("#pgwtr .daysForBarricade").val()&&$("#pgwtr .connectionType").val()?readyforNextPage=!0:showError($("#pgwtr .next"),$("#pgwtr .daysForBarricade, #pgwtr .connectionType")):"will not"==$("#pgwtr .barricadeIf").val()&&""!=$("#pgwtr .connectionType").val()?readyforNextPage=!0:showError($("#pgwtr .next"),$("#pgwtr .daysForBarricade, #pgwtr .connectionType")),readyforNextPage&&("wtr"==permits[permits.length-1]?finalPage():(currentPermit=permits[$.inArray("wtr",permits)+1],$("#pgwtr").removeClass("active"),$("#pg"+currentPermit).addClass("active"),nextPermit(currentPermit)))}function plmPageNext(){readyforNextPage=!1,"residential"==$(".plmProjectType").val()?0<$("#pgplm .plmValuation").val()?readyforNextPage=!0:putIn($("#pgplm .q3"),warningText):"commercial"==$(".plmProjectType").val()&&0<$("#pgplm .fixtureQuantity").val()?readyforNextPage=!0:putIn($("#pgplm .q3"),warningText),readyforNextPage?"plm"==permits[permits.length-1]?finalPage():(currentPermit=permits[$.inArray("plm",permits)+1],$("#pgplm").removeClass("active"),$("#pg"+currentPermit).addClass("active"),nextPermit(currentPermit)):console.log("You are not ready for the next page")}function mechPageNext(){readyforNextPage=!1,0<$(".mechValuation").val()?readyforNextPage=!0:putIn($("#pgplm .q3"),warningText),readyforNextPage?"mech"==permits[permits.length-1]?finalPage():(currentPermit=permits[$.inArray("mech",permits)+1],$("#pgmech").removeClass("active"),$("#pg"+currentPermit).addClass("active"),nextPermit(currentPermit)):console.log("You are not ready for the next page")}function stormPageNext(){"will"==$("#pgstorm .rowRestoration").val()?0<$("#pgstorm .daysForBarricade").val()&&$("#pgstorm .dischargePoint").val()&&(readyforNextPage=!0):"will not"==$("#pgstorm .rowRestoration").val()&&""!=$("#pgstorm .dischargePoint").val()?readyforNextPage=!0:showError($("#pgstorm .next"),$("#pgstorm input")),readyforNextPage&&("storm"==permits[permits.length-1]?finalPage():(currentPermit=permits[$.inArray("storm",permits)+1],$("#pgstorm").removeClass("active"),$("#pg"+currentPermit).addClass("active"),nextPermit(currentPermit)))}function sewerPageNext(){"will"==$("#pgsewer .rowRestoration").val()?0<$("#pgsewer .daysForBarricade").val()&&$("#pgsewer .connectionType").val()&&(readyforNextPage=!0):"will not"==$("#pgsewer .rowRestoration").val()&&""!=$("#pgsewer .connectionType").val()?readyforNextPage=!0:showError($("#pgsewer .next"),$("#pgsewer input, #pgsewer select")),readyforNextPage&&("sewer"==permits[permits.length-1]?finalPage():(currentPermit=permits[$.inArray("sewer",permits)+1],$("#pgsewer").removeClass("active"),$("#pg"+currentPermit).addClass("active"),nextPermit(currentPermit)))}function sitePageNext(){readyforNextPage=!1,""!=$("#gradingArea").val()&&""!=$("#hardSurfaceArea").val()&&""!=$("#disturbedArea").val()?"sitedev"==permits[permits.length-1]?finalPage():(currentPermit=permits[$.inArray("sitedev",permits)+1],$("#pgsitedev").removeClass("active"),$("#pg"+currentPermit).addClass("active"),nextPermit(currentPermit)):showError($("#pgsitedev .next"),$("#pgsitedev input"))}function woPageNext(){"wo"==permits[permits.length-1]?finalPage():(currentPermit=permits[$.inArray("wo",permits)+1],$("#pgwo").removeClass("active"),$("#pg"+currentPermit).addClass("active"),nextPermit(currentPermit))}function signPageNext(){$("#signCost").val()?"sign"==permits[permits.length-1]?finalPage():(currentPermit=permits[$.inArray("sign",permits)+1],$("#pgsign").removeClass("active"),$("#pg"+currentPermit).addClass("active"),nextPermit(currentPermit)):showError($("#pgsign .next"),$("#signCost"))}function demoPageNext(){$("#pgdemo input, #pgdemo select").val()?"demo"==permits[permits.length-1]?finalPage():(currentPermit=permits[$.inArray("demo",permits)+1],$("#pgdemo").removeClass("active"),$("#pg"+currentPermit).addClass("active"),nextPermit(currentPermit)):showError($("#pgdemo .next"),$("#pgdemo input, #pgdemo select"))}function landPageNext(){readyforNextPage=!1,$("#pgland select").val()?readyforNextPage=("extension of permit"==$("#luPermitType").val()||"site approval"==$("#luPermitType").val()||"temporary homeless camp"==$("#luPermitType").val()?useRows.push($("#luPermitType").val(),""):(useRows.push($("#luPermitType").val()),useRows.push($("#luPermitSubtype").val())),!0):0<useRows.length&&(readyforNextPage=!0),($("#pgland select").val()||0<useRows.length)&&""!=$("#luPermitType").val()&&$("#luPermitSubtype").val(),readyforNextPage?"land"==permits[permits.length-1]?finalPage():(currentPermit=permits[$.inArray("land",permits)+1],$("#pgland").removeClass("active"),$("#pg"+currentPermit).addClass("active"),nextPermit(currentPermit)):showError($("#pgland .next"),$("#pgland input, #pgland select"))}function firePageNext(){$("#fireCategories").val()&&$.each($("#pgfire input"),function(){0<$(this).val()&&(readyforNextPage=!0)}),(readyforNextPage="smoke control systems"==$("#fireCategories").val()?!0:readyforNextPage)?"fire"==permits[permits.length-1]?finalPage():(currentPermit=permits[$.inArray("fire",permits)+1],$("#pgfire").removeClass("active"),$("#pg"+currentPermit).addClass("active"),nextPermit(currentPermit)):showError($("#pgfire .next"),$("#pgfire input, #pgfire select"))}function eventPageNext(){""!=$("#eventOrgType").val()&&""!=$("#eventBlocks").val()&&""!=$("#eventDate").val()?"event"==permits[permits.length-1]?finalPage():(currentPermit=permits[$.inArray("event",permits)+1],$("#pgevent").removeClass("active"),$("#pg"+currentPermit).addClass("active"),nextPermit(currentPermit)):showError($("#pgevent .next"),$("#pgevent input, #pgevent select"))}function rowPageNext(){var e=[];"will"==$("#pgrow .barricadeIf").val()&&(""!=$("#pgrow .daysForBarricade").val()?e.push(!0):e.push(!1)),"construction within (RCON)"==$("#rowType").val()?(""!=$(".barricadeIf").val()||$("#rconCurb").is(":checked")||$("#reconSidewalk").is(":checked")||$("#rconDriveway").is(":checked")||$("#rconTranchBore").is(":checked")||$("#addPaveArea").is(":checked")||e.push(!1),$("#rconSidewalk").is(":checked")&&(""!=$("#rowSidewalkWork").val()?e.push(!0):e.push(!1),""!=$("#rowSidewalkSize").val()?e.push(!0):e.push(!1)),$("#rconDriveway").is(":checked")&&"is"==$("#rowDriveway").val()&&(""!=$("#rowAsphaltDrivewayNum").val()||""!=$("#rowConcreteDrivewayNum").val()?e.push(!0):e.push(!1)),$("#rconCurb").is(":checked")&&(""!=$("#rowGutterLength").val()?e.push(!0):e.push(!1)),$("#rconTrenchBore").is(":checked")&&("an open cut trench"==$("#rowTrenchType").val()?""!=$("#rowTrenchLength").val()?e.push(!0):e.push(!1):"a monitoring well, a bore,or potholing"==$("#rowTrenchType").val()&&(""!=$("#rowBoreCount").val()?e.push(!0):e.push(!1))),""!=$("#rowPaving").val()?e.push(!0):e.push(!1)):"occupancy of (ROCC)"==$("#rowType").val()?"ground water monitoring well"==$("#rowOcc").val()&&(""!=$("#rowWell").val()?e.push(!0):e.push(!1)):"use of (RUSE)"==$("#rowType").val()?"a special motor vehicle"==$("#rowUse").val()?""!=$("#rowSMVType").val()?e.push(!0):e.push(!1):"overtime parking"==$("#rowUse").val()?""!=$("#rowUseDays").val()?e.push(!0):e.push(!1):"a banner"==$("#rowUse").val()&&"will"==$("#rowBanner").val()&&(""!=$("#rowBannerBlocks").val()&&""!=$("#rowBannerInstall").val()?e.push(!0):e.push(!1)):"utility work in (RUTI)"==$("#rowType").val()?("will"==$("#rowTrench").val()&&(""!=$("#rowTrenchLength").val()?e.push(!0):e.push(!1)),"will"==$("#rowBores").val()&&(""!=$("#rowBoreCount").val()?e.push(!0):e.push(!1))):e.push(!1),readyforNextPage=!0;for(var t=0;t<e.length;t++)if(!1===e[t]){readyforNextPage=!1;break}readyforNextPage?"row"==permits[permits.length-1]?finalPage():(currentPermit=permits[$.inArray("row",permits)+1],$("#pgrow").removeClass("active"),$("#pg"+currentPermit).addClass("active"),nextPermit(currentPermit)):showError($("#pgrow .next"),$("#pgrow input, #pgrow select"))}function prePageNext(){$("#preOptionA").is(":checked")||$("#preOptionB").is(":checked")?"pre"==permits[permits.length-1]?finalPage():(currentPermit=permits[$.inArray("pre",permits)+1],$("#pgpre").removeClass("active"),$("#pg"+currentPermit).addClass("active"),nextPermit(currentPermit)):showError($("#pgpre .next"),$("#pgpre input, #pgpre select"))}function lastPageNext(){readyForLastPage=!1,$(".description").addClass("open").removeClass("disclaimer").html(pg1and2instructions),$("#pglast, .tab-links li").removeClass("active").removeClass("post"),$("#pgfirst, #pgfirst-pointer").addClass("active"),$("#details-num").text("")}function finalPage(){for(var e in $(".fee-details").html(""),permits)"bld"==permits[e]?$(".fee-details").append('<section class="fee-item" id="bldPermitFeeDetails"><header><i class="fa fa-caret-right" aria-hidden="true"></i> <b class="permit-title">Building</b><span class="money total"></span></header>'+permitFeeDetails+"</section>"):"wtr"==permits[e]?$(".fee-details").append('<section class="fee-item" id="wtrPermitFeeDetails"><header><i class="fa fa-caret-right" aria-hidden="true"></i> <b class="permit-title">Water</b><span class="money total"></span></header>'+permitFeeDetails+"</section>"):"plm"==permits[e]?$(".fee-details").append('<section class="fee-item" id="plmPermitFeeDetails"><header><i class="fa fa-caret-right" aria-hidden="true"></i> <b class="permit-title">Plumbing</b><span class="money total"></span></header>'+permitFeeDetails+"</section>"):"mech"==permits[e]?$(".fee-details").append('<section class="fee-item" id="mechPermitFeeDetails"><header><i class="fa fa-caret-right" aria-hidden="true"></i> <b class="permit-title">Mechanical</b><span class="money total"></span></header>'+permitFeeDetails+"</section>"):"storm"==permits[e]?$(".fee-details").append('<section class="fee-item" id="stormPermitFeeDetails"><header><i class="fa fa-caret-right" aria-hidden="true"></i> <b class="permit-title">Surfacewater</b><span class="money total"></span></header>'+permitFeeDetails+"</section>"):"wo"==permits[e]?$(".fee-details").append('<section class="fee-item" id="woPermitFeeDetails"><header><i class="fa fa-caret-right" aria-hidden="true"></i> <b class="permit-title">Work Order</b><span class="money total"></span></header>'+permitFeeDetails+"</section>"):"sewer"==permits[e]?$(".fee-details").append('<section class="fee-item" id="sewerPermitFeeDetails"><header><i class="fa fa-caret-right" aria-hidden="true"></i> <b class="permit-title">Wastewater</b><span class="money total"></span></header>'+permitFeeDetails+"</section>"):"sitedev"==permits[e]?$(".fee-details").append('<section class="fee-item" id="sitedevPermitFeeDetails"><header><i class="fa fa-caret-right" aria-hidden="true"></i> <b class="permit-title">Site Development</b><span class="money total"></span></header>'+permitFeeDetails+"</section>"):"sign"==permits[e]?$(".fee-details").append('<section class="fee-item" id="signPermitFeeDetails"><header><i class="fa fa-caret-right" aria-hidden="true"></i> <b class="permit-title">Sign</b><span class="money total"></span></header>'+permitFeeDetails+"</section>"):"demo"==permits[e]?$(".fee-details").append('<section class="fee-item" id="demoPermitFeeDetails"><header><i class="fa fa-caret-right" aria-hidden="true"></i> <b class="permit-title">Demolition</b><span class="money total"></span></header>'+permitFeeDetails+"</section>"):"land"==permits[e]?$(".fee-details").append('<section class="fee-item" id="landPermitFeeDetails"><header><i class="fa fa-caret-right" aria-hidden="true"></i> <b class="permit-title">Land Use</b><span class="money total"></span></header>'+permitFeeDetails+"</section>"):"fire"==permits[e]?$(".fee-details").append('<section class="fee-item" id="firePermitFeeDetails"><header><i class="fa fa-caret-right" aria-hidden="true"></i> <b class="permit-title">Fire</b><span class="money total"></span></header>'+permitFeeDetails+"</section>"):"event"==permits[e]?$(".fee-details").append('<section class="fee-item" id="eventPermitFeeDetails"><header><i class="fa fa-caret-right" aria-hidden="true"></i> <b class="permit-title">Special Events</b><span class="money total"></span></header>'+permitFeeDetails+"</section>"):"row"==permits[e]?$(".fee-details").append('<section class="fee-item" id="rowPermitFeeDetails"><header><i class="fa fa-caret-right" aria-hidden="true"></i> <b class="permit-title">Right-of-Way</b><span class="money total"></span></header>'+permitFeeDetails+"</section>"):"pre"==permits[e]&&$(".fee-details").append('<section class="fee-item" id="prePermitFeeDetails"><header><i class="fa fa-caret-right" aria-hidden="true"></i> <b class="permit-title">Pre-Development Services</b><span class="money total"></span></header>'+permitFeeDetails+"</section>");finalCalculation(),$("#pgmid-pointer").addClass("post"),$(".question-box, .tab-links li").removeClass("active"),$("#pglast, #pglast-pointer").addClass("active"),$(".description").addClass("open").addClass("disclaimer").html(pg3disclaimer)}function finalCalculation(){for(var e in grandTotal=0,permits){var t,i;sitePlanrev=siteFee=reserveFund=resourceFund=emergencyFund=techFund=stateFee=barricade=bonding=useFee=annual=total=planRevFee=permitFee=valuation=0;if("bld"==permits[e]){if("C"==projectType1){for(var r=valuation=0;r<occupRows.length;r+=3)valuation+=occupRows[r+2]*getBVD(occupRows[r+1],occupRows[r]);$("#remodelCost").val()&&(valuation+=parseInt($("#remodelCost").val())),console.log("Code Calculated Valuation: "+valuation.toFixed(2)),permitFee=BldPermitCalc(valuation.toFixed(2)),planRevFee=CompPlanReviewCalc(permitFee),emergencyFund=.05*permitFee,resourceFund=techFund=.05*(permitFee+planRevFee),reserveFund=.02*(permitFee+planRevFee),stateFee=25}"R"==projectType1&&(reserveFund="RN"==projectType?(valuation=BldrnValuationAdjustment(parseInt($("#livingSpaceArea").val()),parseInt($("#veneerChoice").val()),parseInt($("#carport").val()),parseInt($("#deckArea").val()),parseInt($("#premanArea").val()),parseInt($("#garageArea").val())+parseInt($("#otherArea").val()||0),0,"VB","R-3 Residential, one- and two-family"),console.log("Code Calculated Valuation: "+valuation),emergencyFund=.05*((total=(permitFee=(permitFee=.0131*valuation)<180?180:permitFee)+(planRevFee=.45*permitFee)+(siteFee=.65*permitFee)+(sitePlanrev=.45*permitFee))-planRevFee-sitePlanrev),resourceFund=techFund=.05*total,.02*total):(resourceFund=techFund="RB"==projectType||"RA"==projectType?(valuation=BldrnValuationAdjustment(parseInt($("#livingSpaceArea").val()),parseInt($("#veneerChoice").val()),parseInt($("#carport").val()),parseInt($("#deckArea").val()),parseInt($("#premanArea").val()),parseInt($("#garageArea").val()),parseInt($("#basementArea").val()),"VB","R-3 Residential, one- and two-family"),valuation=parseFloat(valuation),console.log("Code Calculated Valuation: "+valuation),$("#remodelCost").val()&&(valuation+=parseFloat($("#remodelCost").val())),siteFee=.65*(permitFee=(permitFee=.0281*valuation)<180?180:permitFee),emergencyFund=.05*permitFee,.05*(permitFee+(planRevFee=sitePlanrev=.45*permitFee))):(valuation=$("#remodelCost").val(),emergencyFund=.05*(permitFee=(permitFee=.0281*valuation)<180?180:permitFee),.05*(permitFee+(planRevFee=.45*permitFee))),.02*(permitFee+planRevFee)),stateFee=6.5),$(".description").addClass("open").addClass("disclaimer").html('<div class="disclaimer">This fee estimator is intended for informational purposes only, and currently available for limited permit types.  Please note, complete identification of all required permits and final fee calculations will be completed during the processing of a permit application.</div>'),grandTotal+=total=permitFee+techFund+emergencyFund+resourceFund+reserveFund+stateFee+planRevFee+annual+useFee+bonding+siteFee+sitePlanrev+barricade,feeDetailsMaker("#bldPermitFeeDetails",[permitFee,techFund,emergencyFund,resourceFund,reserveFund,stateFee,planRevFee,annual,useFee,bonding,siteFee,sitePlanrev,barricade,rowFee,preFee]),$("#bldPermitFeeDetails .total").html(makeMoney(total))}else if("plm"==permits[e])resourceFund=reserveFund=emergencyFund=techFund=permitFee=0,"residential"==$(".plmProjectType").val()?(permitFee=.0281*$(".plmValuation").val())<180&&(permitFee=180):"commercial"==$(".plmProjectType").val()?(permitFee=60,permitFee+=43+17*($(".fixtureQuantity").val()-1)):(console.log("No Project Type!"),permitFee=0),grandTotal+=total=permitFee+(techFund=.05*permitFee)+(emergencyFund=.05*permitFee)+(resourceFund=.05*permitFee)+(reserveFund=.02*permitFee)+stateFee+planRevFee+annual+useFee+bonding+siteFee+sitePlanrev+barricade,feeDetailsMaker("#plmPermitFeeDetails",[permitFee,techFund,emergencyFund,resourceFund,reserveFund,stateFee,planRevFee,annual,useFee,bonding,siteFee,sitePlanrev,barricade,rowFee,preFee]),$("#plmPermitFeeDetails .total").html(makeMoney(total));else if("mech"==permits[e])(reserveFund=emergencyFund=techFund=permitFee=0)<$(".mechValuation").val()?(permitFee=.0281*$(".mechValuation").val(),emergencyFund=techFund=.05*(permitFee=permitFee<180?180:permitFee),reserveFund=.02*permitFee):console.log("No mechanical valation was entereed"),grandTotal+=total=permitFee+techFund+emergencyFund+resourceFund+reserveFund+stateFee+planRevFee+annual+useFee+bonding+siteFee+sitePlanrev+barricade,feeDetailsMaker("#mechPermitFeeDetails",[permitFee,techFund,emergencyFund,resourceFund,reserveFund,stateFee,planRevFee,annual,useFee,bonding,siteFee,sitePlanrev,barricade,rowFee,preFee]),$("#mechPermitFeeDetails .total").html(makeMoney(total));else if("sewer"==permits[e])permitFee=120,"adding"==$(".connectionType").val()?permitFee+=430:permitFee+=380,"will"==$(".rowRestoration").val()&&(rowFee=110),barricade+=findMinFee(69,350,$(".daysForBarricade").val()),grandTotal+=total=permitFee+(techFund=.05*(permitFee+barricade+rowFee))+(emergencyFund=0)+(resourceFund=.05*(permitFee+barricade+rowFee))+(reserveFund=.02*(permitFee+barricade+rowFee))+stateFee+planRevFee+annual+useFee+bonding+siteFee+sitePlanrev+barricade+rowFee,feeDetailsMaker("#sewerPermitFeeDetails",[permitFee,techFund,emergencyFund,resourceFund,reserveFund,stateFee,planRevFee,annual,useFee,bonding,siteFee,sitePlanrev,barricade,rowFee,preFee]),$("#sewerPermitFeeDetails .total").html(makeMoney(total));else if("wtr"==permits[e])permitFee=0,"adding"==$(".connectionType").val()?permitFee+=210:permitFee=110,rowFee="will"==$(".rowRestoration").val()?110:0,"will"==$(".barricadeIf").val()?barricade+=findMinFee(69,350,$(".daysForBarricade").val()):barricade=0,grandTotal+=total=permitFee+(techFund=.05*(permitFee+barricade+rowFee))+(emergencyFund=0)+(resourceFund=.05*(permitFee+barricade+rowFee))+(reserveFund=.02*(permitFee+barricade+rowFee))+stateFee+planRevFee+annual+useFee+bonding+siteFee+sitePlanrev+barricade+rowFee,feeDetailsMaker("#wtrPermitFeeDetails",[permitFee,techFund,emergencyFund,resourceFund,reserveFund,stateFee,planRevFee,annual,useFee,bonding,siteFee,sitePlanrev,barricade,rowFee,preFee]),$("#wtrPermitFeeDetails .total").html(makeMoney(total));else if("storm"==permits[e])"a sidewalk drain"!=$(".dischargePoint").val()?(permitFee=510,"will"==$(".rowRestoration").val()&&(rowFee=52)):permitFee=510,barricade+=findMinFee(69,350,$(".daysForBarricade").val()),grandTotal+=total=permitFee+(techFund=.05*(permitFee+barricade+rowFee))+(emergencyFund=0)+(resourceFund=.05*(permitFee+barricade+rowFee))+(reserveFund=.02*(permitFee+barricade+rowFee))+stateFee+planRevFee+annual+useFee+bonding+siteFee+sitePlanrev+barricade,feeDetailsMaker("#stormPermitFeeDetails",[permitFee,techFund,emergencyFund,resourceFund,reserveFund,stateFee,planRevFee,annual,useFee,bonding,siteFee,sitePlanrev,barricade,rowFee,preFee]),$("#stormPermitFeeDetails .total").html(makeMoney(total));else if("sitedev"==permits[e]){var a=parseInt($("#cutArea").val())+parseInt($("#fillArea").val()),n=(parseInt($("#clearingArea").val()),parseInt($("#disturbedArea").val())),o=parseInt($("#hardSurfaceArea").val()),s=!1,o=(5e4<o||1e4<a||435600<n?permitFee=-1:5e3<o||500<a||43560<n?permitFee=6240:2e3<o||50<a||7e3<n?permitFee=2810:o<2e3&&a<50&&n<7e3&&(permitFee=460),0);0<permitFee?(resourceFund=emergencyFund=techFund=.05*permitFee,reserveFund=.02*permitFee,o=permitFee):(s=!0,reserveFund=resourceFund=emergencyFund=techFund=permitFee=-1),total=o+techFund+emergencyFund+resourceFund+reserveFund+stateFee+planRevFee+annual+useFee+bonding+siteFee+sitePlanrev+barricade,grandTotal+=total=s?0:total,feeDetailsMaker("#sitedevPermitFeeDetails",[permitFee,techFund,emergencyFund,resourceFund,reserveFund,stateFee,planRevFee,annual,useFee,bonding,siteFee,sitePlanrev,barricade,rowFee,preFee]),0<total?$("#sitedevPermitFeeDetails .total").html(makeMoney(total)):$("#sitedevPermitFeeDetails .total").html("Hourly - See Detail")}else if("wo"==permits[e])total=o+(techFund=permitFee=-1)+(emergencyFund=-1)+(resourceFund=-1)+(reserveFund=-1)+stateFee+planRevFee+annual+useFee+bonding+siteFee+sitePlanrev+barricade,grandTotal+=total=(s=!0)?0:total,feeDetailsMaker("#woPermitFeeDetails",[permitFee,techFund,emergencyFund,resourceFund,reserveFund,stateFee,planRevFee,annual,useFee,bonding,siteFee,sitePlanrev,barricade,rowFee,preFee]),0<total?$("#woPermitFeeDetails .total").html(makeMoney(total)):$("#woPermitFeeDetails .total").html("Hourly - See Detail");else if("sign"==permits[e])valuation=$("#signCost").val(),permitFee=BldPermitCalc(valuation),barricade+=findMinFee(69,350,$(".daysForBarricade").val()),grandTotal+=total=permitFee+(techFund=.05*((planRevFee=(planRevFee=.65*permitFee)<54?54:planRevFee)+permitFee+barricade))+(emergencyFund=.05*(permitFee+barricade))+(resourceFund=.05*(planRevFee+permitFee+barricade))+(reserveFund=.02*(planRevFee+permitFee+barricade))+stateFee+planRevFee+annual+useFee+bonding+siteFee+sitePlanrev+barricade,feeDetailsMaker("#signPermitFeeDetails",[permitFee,techFund,emergencyFund,resourceFund,reserveFund,stateFee,planRevFee,annual,useFee,bonding,siteFee,sitePlanrev,barricade,rowFee,preFee]),$("#signPermitFeeDetails .total").html(makeMoney(total));else if("demo"==permits[e]){a=$("#demoType").val();"residential"==a?permitFee=180:"commercial"==a&&(permitFee=300),grandTotal+=total=permitFee+(techFund=.05*permitFee)+(emergencyFund=.05*permitFee)+(resourceFund=.05*permitFee)+(reserveFund=.02*permitFee)+stateFee+planRevFee+annual+useFee+bonding+siteFee+sitePlanrev+barricade,feeDetailsMaker("#demoPermitFeeDetails",[permitFee,techFund,emergencyFund,resourceFund,reserveFund,stateFee,planRevFee,annual,useFee,bonding,siteFee,sitePlanrev,barricade,rowFee,preFee]),$("#demoPermitFeeDetails .total").html(makeMoney(total))}else if("land"==permits[e]){for(var p=0,e=0;e<useRows.length;e+=2)permitFee=landUseFee(useRows[e],useRows[e+1]),"critical areas"!=useRows[e]&&"shoreline"!=useRows[e]||(p+=permitFee);grandTotal+=total=permitFee+(techFund=.05*permitFee)+emergencyFund+(resourceFund=p?.05*permitFee:resourceFund)+(reserveFund=.02*permitFee)+stateFee+planRevFee+annual+useFee+bonding+siteFee+sitePlanrev+barricade,feeDetailsMaker("#landPermitFeeDetails",[permitFee,techFund,emergencyFund,resourceFund,reserveFund,stateFee,planRevFee,annual,useFee,bonding,siteFee,sitePlanrev,barricade,rowFee,preFee]),$("#landPermitFeeDetails .total").html(makeMoney(total))}else"fire"==permits[e]?(n=!0,"fire alarms"==(t=$("#fireCategories").val())&&(permitFee=fireAlarmCalc($("#pgfire .q2 input").val()),n=!1),"pre-engineered systems"==t&&(permitFee=1020+3.5*Math.max(0,$("#firePreEngNoz").val()-50),n=!1),"kitchen hood suppression systems"==t&&(permitFee=450*$("#pgfire .q2 input").val()),"underground fire systems"==t&&(permitFee=380*$("#pgfire .q2 input").val()),"fire sprinkler tenant improvement"==t&&($("#fireSprinklerHeads").val()<=6&&(permitFee=300),7<=$("#fireSprinklerHeads").val()&&$("#fireSprinklerHeads").val()<=20&&(permitFee=590),20<$("#fireSprinklerHeads").val())&&(permitFee=910+5*($("#fireSprinklerHeads").val()-20)),"new water based fire suppression systems"==t&&(permitFee=fireSprinklerCalc($("#fireSuppressionRisers").val(),$("#fireSuppressionHeads").val()),permitFee=(permitFee+=450*$("#fireSuppressionStandpipes").val())+730*$("#fireSuppressionPumps").val()),"smoke control systems"==t&&(n=!(permitFee=planRevFee=300)),grandTotal+=total=permitFee+(techFund=.05*permitFee)+(emergencyFund=.05*permitFee)+(resourceFund=n?.05*permitFee:resourceFund)+(reserveFund=.02*permitFee)+stateFee+planRevFee+annual+useFee+bonding+siteFee+sitePlanrev+barricade,feeDetailsMaker("#firePermitFeeDetails",[permitFee,techFund,emergencyFund,resourceFund,reserveFund,stateFee,planRevFee,annual,useFee,bonding,siteFee,sitePlanrev,barricade,rowFee,preFee]),$("#firePermitFeeDetails .total").html(makeMoney(total))):"event"==permits[e]?(t=0,permitFee="commercial"==$("#eventOrgType").val()?75:50,(i=new Date).setDate(i.getDate()+60),new Date($("#eventDate").val())>i&&(t=.1*(permitFee+0)),grandTotal+=total=(permitFee+=0+t)+techFund+emergencyFund+resourceFund+reserveFund+stateFee+planRevFee+annual+useFee+bonding+siteFee+sitePlanrev+barricade,feeDetailsMaker("#eventPermitFeeDetails",[permitFee,techFund,emergencyFund,resourceFund,reserveFund,stateFee,planRevFee,annual,useFee,bonding,siteFee,sitePlanrev,barricade,rowFee,preFee]),$("#eventPermitFeeDetails .total").html(makeMoney(total))):"pre"==permits[e]?($("#preOptionA").is(":checked")?preFee=1560:$("#preOptionB").is(":checked")&&(preFee=3120),grandTotal+=total=permitFee+techFund+emergencyFund+resourceFund+reserveFund+stateFee+planRevFee+annual+useFee+bonding+siteFee+sitePlanrev+barricade+preFee,feeDetailsMaker("#prePermitFeeDetails",[permitFee,techFund,emergencyFund,resourceFund,reserveFund,stateFee,planRevFee,annual,useFee,bonding,siteFee,sitePlanrev,barricade,rowFee,preFee]),$("#prePermitFeeDetails .total").html(makeMoney(total))):"row"==permits[e]&&("construction within (RCON)"==$("#rowType").val()?permitFee=RconCalc():"occupancy of (ROCC)"==$("#rowType").val()?"residential"==$("#rowOcc").val()||"commercial"==$("#rowOcc").val()?(permitFee=640,bonding=useFee=annual=planRevFee=0):"temporary sidewalk cafe"==$("#rowOcc").val()||"sidewalk cafe"==$("#rowOcc").val()?bonding=useFee=annual=planRevFee=0:"ground water monitoring well"==$("#rowOcc").val()&&(permitFee=640,annual=planRevFee=0,1==$("#rowWell").val()?useFee=175:1<$("#rowWell").val()&&(useFee=150*($("#rowWell").val()-1)+175),bonding=1e4):"use of (RUSE)"==$("#rowType").val()?permitFee=RuseCalc():"utility work in (RUTI)"==$("#rowType").val()&&(permitFee=RutiCalc()),$("#pgrow .daysForBarricade").val()&&(barricade+=findMinFee(69,350,$("#pgrow .daysForBarricade").val())),"occupancy of (ROCC)"!=$("#rowType").val()&&(resourceFund=techFund=.05*(permitFee+barricade),reserveFund=.02*(permitFee+barricade)),grandTotal+=total=permitFee+techFund+emergencyFund+resourceFund+reserveFund+stateFee+planRevFee+annual+useFee+bonding+siteFee+sitePlanrev+barricade,feeDetailsMaker("#rowPermitFeeDetails",[permitFee,techFund,emergencyFund,resourceFund,reserveFund,stateFee,planRevFee,annual,useFee,bonding,siteFee,sitePlanrev,barricade,rowFee,preFee]),$("#rowPermitFeeDetails .total").html(makeMoney(total)))}$("#grandTotal").html(makeMoney(grandTotal))}function feeDetailsMaker(e,t){for(var i,r=[".base",".techFund",".emergencyFund",".resourceFund",".reserveFund",".state",".review",".annual",".useFee",".bonding",".siteFee",".sitePlanrev",".barricadeFee",".rowFee",".preFee"],a=0;a<t.length;a++)if(0!=t[a])if(i=e+" "+r[a]+" .money",$(e+" .fee-sub-items").append(feeDetailsVar[a]),""!=$(i).html()&&$(i).html(""),-1==t[a])switch(a){case 0:$(i).html("$190/hour");break;case 1:case 2:case 3:$(i).html("5% of Base Fee");break;case 4:$(i).html("2% of Base Fee");break;default:$(i).html("Hourly")}else $(i).html(makeMoney(t[a]))}function backPermit(e){(1==permits.length||e==permits[0]?($("#details-num").text(""),$("#pgfirst-pointer").removeClass("post"),$(".description").addClass("open").removeClass("disclaimer").html(pg1and2instructions),$("#pg"+e+", #pgmid-pointer").removeClass("active"),$("#pgfirst, #pgfirst-pointer")):($("#details-num").text(" ("+$.inArray(e,permits)+"/"+permits.length+")"),currentPermit=permits[$.inArray(e,permits)-1],$("#pg"+e).removeClass("active"),$("#pg"+currentPermit+", #pgmid-pointer"))).addClass("active")}function nextPermit(e){$("#details-num").text(" ("+($.inArray(e,permits)+1)+"/"+permits.length+")"),"bld"==e?bldPermit():"wtr"==e?wtrPermit():"plm"==e?plmPermit():"mech"==e?mechPermit():"storm"==e?stormPermit():"sewer"==e?sewerPermit():"sitedev"==e?sitedevPermit():"wo"==e?woPermit():"sign"==e?signPermit():"demo"==e?demoPermit():"land"==e?landPermit():"fire"==e?firePermit():"event"==e?eventPermit():"row"==e?rowPermit():"pre"==e&&prePermit()}function makeMoney(e){var t,e=e.toString().split(".");if(e[1]){if(t=e[1].split(""),i=e[0],1==t.length)t+="0";else if(2==t.length)t=t.join("");else if(2<t.length){t.splice(2,0,"."),t=t.join(""),99<(t=Math.round(t))&&(t-=100,i=parseInt(i)+1),0==t?t="00":t<10&&(t="0"+t);for(var i,r=(i=i.toString().split("")).length-3;0<r;r-=3)i.splice(r,0,",");i=i.join("")}}else{for(r=(i=e[0].split("")).length-3;0<r;r-=3)i.splice(r,0,",");i=i.join(""),t="00"}return"$"+i+"."+t}function getBVD(e,t){e=getIndex(e,["IA","IB","IIA","IIB","IIIA","IIIB","IV","VA","VB"]),t=getIndex(t,["A-1 Assembly, theaters, with stage","A-1 Assembly, theaters, without stage","A-2 Assembly, nightclubs","A-2 Assembly, restaurants, bars, banquet halls","A-3 Assembly, churches","A-3 Assembly, general, community halls, libraries, museums","A-4 Assembly, arenas","B Business","E Educational","F-1 Factory and industrial, moderate hazard","F-2 Factory and industrial, low hazard","H-1 High Hazard, explosives","H234 High Hazard","H-5 HPM","I-1 Institutional, supervised environment","I-2 Institutional, hospitals","I-2 Institutional, nursing homes","I-3 Institutional, restrained","I-4 Institutional, day care facilities","M Mercantile","R-1 Residential, hotels","R-2 Residential, multiple family","R-3 Residential, one- and two-family","R-4 Residential, care/assisted living facilities","S-1 Storage, moderate hazard","S-2 Storage, low hazard","U Utility, miscellaneous"]);return-1==e||-1==t?-1:[[335.89,324.58,316.94,304.93,286.87,278,295.62,266.02,257.55],[307.39,296.08,288.44,276.42,258.37,249.5,267.12,237.51,229.05],[269.94,261.93,254.48,245.85,230.56,223.99,237.02,209.57,202.79],[268.94,260.93,252.48,244.85,228.56,222.99,236.02,207.57,201.79],[311.88,300.57,292.93,280.91,263.3,254.43,271.6,242.45,233.98],[266.07,254.76,246.12,235.1,216.33,208.46,225.8,195.47,188.01],[306.39,295.08,286.44,275.42,256.37,248.5,266.12,235.51,228.05],[260.69,251.13,241.86,231.65,210.99,202.73,222.56,186.21,177.81],[273.46,263.96,255.62,245.04,228.69,217,236.61,200.36,193.94],[160.2,152.78,143.34,138.64,123.55,117.41,132.48,102.44,95.93],[159.2,151.78,143.34,137.64,123.55,116.41,131.48,102.44,94.93],[149.46,142.04,133.6,127.9,114.12,106.97,121.74,93,0],[149.46,142.04,133.6,127.9,114.12,106.97,121.74,93,85.5],[260.69,251.13,241.86,231.65,210.99,202.73,222.56,186.21,177.81],[262.22,252.95,244.31,235.67,215.42,209.47,235.71,193.82,187.73],[434.15,424.59,415.32,405.12,383.35,0,396.02,358.57,0],[302.01,292.45,283.18,272.97,253.83,0,263.88,229.05,0],[295.86,286.31,277.03,266.83,247.95,238.69,257.74,223.17,212.77],[262.22,252.95,244.31,235.67,215.42,209.47,235.71,193.82,187.73],[201.37,193.36,184.91,177.28,161.72,156.15,168.45,140.73,134.95],[264.67,255.41,246.77,238.13,218.35,212.4,238.17,196.75,190.67],[221.32,212.06,203.42,194.78,175.96,170.01,194.82,154.36,148.28],[209.61,203.74,198.94,195.12,188.41,181.45,191.77,175.86,165.67],[262.22,252.95,244.31,235.67,215.42,209.47,235.71,193.82,187.73],[148.46,141.04,131.6,126.9,112.12,105.97,120.74,91,84.5],[147.46,140.04,131.6,125.9,112.12,104.97,119.74,91,83.5],[114.09,107.37,99.89,95.6,85.13,79.54,90.99,67.39,64.19]][t][e]}function getIndex(e,t){for(var i=0;i<t.length;i++)if(e==t[i])return i;return-1}function BldPermitCalc(e){var t=0;return null==e?0:((e=parseInt(e))<=500?t=53:500<=e&&e<=2e3?t=7*Math.ceil((e-500)/100)+53:2e3<=e&&e<=25e3?t=30*Math.ceil((e-2e3)/1e3)+160:25e3<=e&&e<=5e4?t=23*Math.ceil((e-25e3)/1e3)+850:5e4<=e&&e<=1e5?t=15*Math.ceil((e-5e4)/1e3)+1410:1e5<=e&&e<=5e5?t=13*Math.ceil((e-1e5)/1e3)+2160:5e5<=e&&e<=1e6?t=10*Math.ceil((e-5e5)/1e3)+7150:1e6<=e&&(t=8.5*Math.ceil((e-1e6)/1e3)+12140),parseFloat(t))}function CompPlanReviewCalc(e){e=(.65*e).toFixed(2);return e<54&&(e=54),parseFloat(e)}function BldrnValuationAdjustment(e,t,i,r,a,n,o,s,p){var l=0,c=0;return e&&(l+=e),i&&(l+=i,c+=i*(.75*getBVD("VB","U Utility, miscellaneous"))),r&&(l+=r,c+=r*(.67*getBVD("VB","U Utility, miscellaneous"))),a&&(l+=a,c+=a*(.5*getBVD("VB","R-3 Residential, one- and two-family"))),n&&(c+=n*getBVD(s,"U Utility, miscellaneous")),o&&(l+=o,c+=31.5*o),e&&(c+=2e3<l||"Yes"==t?e*(1.25*getBVD(s,p)):e*getBVD(s,p)),Number(c).toFixed(2)}function StateBldCalc(e){var t;return t=1<arguments.length&&1==arguments[1]&&1<e?2*(e-1)+4.5:4.5,parseFloat(t)}function findMinFee(e,t,i){Math.floor(i/30);return 30<i?t+findMinFee(e,t,i-30):5<i?t:i*e}function isMetered(e,t){capId=t;var i=0;switch(getAppSpecific("OVERTIMEPARKING")){case"A":case"C":i=10*e;break;case"B":i=12*e;break;case"D":i=8*e}return i}function landUseFee(e,t){"major modification of permit"!=e&&"open space use classification"!=e&&"site approval"!=e&&"site rezone/reclassification"!=e&&"special development permit"!=e&&"temporary homeless camp"!=e&&"waiver"!=e||(t="N/A");var i=6240;return parseFloat({"accessory dwelling unit":{attached:1250,detached:1250,"ADU reauthorization":450},"additional/expanded notice":{"100-400 feet (additional only)":630,"1000 feet":1250,"2500 feet":2500},"conditional use":{"large scale retail":6240,"correctional facility":6240,"detention facility":6240,"all others":6240},"critical areas":{"activities allowed with staff review":1250,"development permit":11230,"minor development permit":6240,verification:4370},"development regulation agreement":{"affordable housing (not in designated center) - 1 acre or more in size":i,"downtown regional growth center - landmarks historic structure":i,"downtown regional growth center - public ownership":i,"international financial services area (IFSA)":i,"public facility site - 5 acres or more in size":i,"tacoma mall neighborhood regional growth center - 2 acres or more in size":i},"environmental review":{"environmental impact statement":0,"SEPA with a discretionary land use permit":1250,"residential buildings (20+ units, under 12000 sf), signs, parking lots, misc actions":2500,"residential buildings (20+ units, over 12000 sf), grading (over 500 cy)":4370},"information requests":{"determination or interpretation by director":6240,"zoning verification letter":320},"major modification of permit":{"N/A":0},"open space use classification":{"N/A":6240},"plats / BLAs / segregations / combinations":{"binding site plan Approval":3500,"segregation/combination":380,"boundary line adjustment (2 Lots)":2250,"boundary line adjustment (3+ Lots)":3500,"short plat (2-4 Lots)":3500,"short plat (5-9 Lots)":5490,"preliminary plat (10+ Lots)":10480,"final plat (2-9 Lots)":1250,"final plat (10+ Lots)":2750,"GIS drafting (New Plats)":60,"GIS drafting (New Short Plat or BLA)":290,"E-Vault scanning and indexing":12},shoreline:{"single family":7490,exemption:380,other:0,"revisions - single family":1250,"revisions - other":3750,"sign waiver":3170,extension:230},"site approval":{"N/A":8740},"site rezone/reclassification":{"N/A":12730},"special development permit":{"N/A":6240},"temporary homeless camp":{"N/A":2540},variance:{"height - main building":3750,"height - accessory building":2500,"single family residential":3750,other:5e3},waiver:{"N/A":6240}}[e][t],2)}function fireAlarmCalc(e){var t=0;return e<51?t=300:50<e&&e<101?t=590:100<e&&e<200?t=880:199<e&&e<300?t=1170:299<e&&e<400?t=1450:399<e&&e<601?t=1750:600<e&&(t=3.5*e),t}function fireSprinklerCalc(e,t){var i=910,r=0;return 2==e?i+=910:2<e&&(i+=910+45*(e-2)),i+(r=20<t?5*(t-20):r)}function RconCalc(){var e=0,t=5*$("#rowSidewalkSize").val()/9,t=4*Math.max(0,t-30),i=4*Math.max(0,$("#rowGutterLength").val()-50),r=310*$("#rowAsphaltDrivewayNum").val(),a=480*$("#rowConcreteDrivewayNum").val(),n=330+Math.max(0,$("#rowTrenchLength").val()-100),o=110*$("#rowBoreCount").val();return $("#rconCurb").is(":checked")&&(e+=i),$("#rconSidewalk").is(":checked")&&("adding a new"==$("#rowSidewalkWork").val()?e+=430+t:e+=510+t),$("#rconDriveway").is(":checked")&&(e=e+r+a),$("#rconTrenchBore").is(":checked")&&("an open cut trench"==$("#rowTrenchType").val()?e+=n:"a monitoring well, a bore, or potholing"==$("#rowTrenchType").val()&&(e+=o)),$("#rowPaving").val()&&0!=$("#rowPaving").val()&&(e+=310+Math.ceil(($("#rowPaving").val()-3e3)/1e3)),e}function RuseCalc(){var e=0;return"a special motor vehicle"==$("#rowUse").val()?"an annual"==$("#rowSMVType").val()||"a single trip"==$("#rowSMVType").val()?e+=53:"a house move"==$("#rowSMVType").val()&&(e+=540):"overtime parking"==$("#rowUse").val()&&0<$("#rowUseDays").val()?e+=findMinFee(44,260,$("#rowUseDays").val()):"a banner"==$("#rowUse").val()&&("city"==$("#rowBannerInstall").val()?e+=620+44*$("#rowBannerBlocks").val():"private"==$("#rowBannerInstall").val()&&(e+=380+110*$("#rowBannerBlocks").val()),$("#rowHoliday").is(":checked"))&&(e+=69*$("#rowBannerBlocks").val()),e}function RutiCalc(){var e=0;return"will"==$("#rowTrench").val()&&(e+=330+Math.max(0,1.5*($("#rowTrenchLength").val()-100))),"will"==$("#rowBores").val()&&(e+=110*$("#rowBoreCount").val()),e}$(document).on("click",".back",function(){back()}),$(document).on("click",".next",function(){next()}),$(document).on("click","#feedback",function(){var e="mailto:iteam@cityoftacoma.org?subject=Problems using the fee estimator&body=%0D%0A%0D%0A----- Leave your comments above. Do not edit beneath this line -----%0D%0A%0D%0A";for(t in permits)if("bld"==permits[t]){if(e+="Building Permit: %0D%0A%0D%0AProject Type 1: "+$("#project-type-1").val()+"%0D%0AProject Type 2: "+$("#project-type-2").val(),"RN"==projectType||"RA"==projectType)e+="%0D%0AStructure Type: "+$("#structureType").val(),"a single family home"==$("#structureType").val()||"a duplex"==$("#structureType").val()?e+="%0D%0ALiving space: "+livingSpaceArea.val()+"%0D%0AGarage: "+garageArea.val()+"%0D%0APreman: "+premanArea.val()+"%0D%0ABasement: "+basementArea.val()+"%0D%0ADeck: "+deckArea.val():"an accessory structure"==$("#structureType").val()&&(garageCheck.is(":checked")&&(e+="%0D%0AGarage: "+garageArea.val()),carportCheck.is(":checked")&&(e+="%0D%0ACarport: "+carportArea.val()),otherCheck.is(":checked"))&&(e+="%0D%0AOther: "+otherArea.val());else if("RR"==projectType||"CR"==projectType)e+="%0D%0ARemodel cost: "+$("#remodelCost").val();else if("CN"==projectType||"CA"==projectType){for(0==occupRows.length&&occupRows.push($("#occupCat").val(),$("#constructionType").val(),$("#cnArea").val()),t=0;t<occupRows.length;t+=3)e+="%0D%0AOccupancy #"+(t+3)/3+": "+occupRows[t]+"%0D%0AConstruction type: "+occupRows[t+1]+"%0D%0ASquare Feet: "+occupRows[t+2];0<numUnits&&(e+="%0D%0AUnits: "+numUnits)}else if("RB"==projectType)e+="%0D%0AStructure Type: "+$("#structureType").val(),"a single family home"==$("#structureType").val()||"a duplex"==$("#structureType").val()?e+="%0D%0ALiving space: "+$("#livingSpaceArea").val()+"%0D%0AGarage: "+$("#garageArea").val()+"%0D%0APreman: "+$("#premanArea").val()+"%0D%0ABasement: "+$("#basementArea").val()+"%0D%0ADeck: "+$("#deckArea").val():"an accessory structure"==$("#structureType").val()&&($("#garageCheck").is(":checked")&&(e+="%0D%0AGarage: "+$("#garageArea").val()),$("#carportCheck").is(":checked")&&(e+="%0D%0ACarport: "+$("#carportArea").val()),$("#otherCheck").is(":checked"))&&(e+="%0D%0AOther: "+$("#otherArea").val()),e+="%0D%0ARemodel cost: "+$("#remodelCost").val();else if("CB"==projectType){for(0==occupRows.length&&occupRows.push($("#occupCat").val(),$("#cnArea").val()),t=0;t<occupRows.length;t+=3)e+="%0D%0AOccupancy #"+(t+3)/3+": "+occupRows[t]+"%0D%0AConstruction type: "+occupRows[t+1]+"%0D%0ASquare Feet: "+occupRows[t+2];0<numUnits&&(e+="%0D%0AUnits: "+numUnits),e+="%0D%0ARemodel cost: "+$("#remodelCost").val()}}else if("plm"==permits[t])e+="%0D%0A%0D%0APlumbing Permit:%0D%0AFixtures: "+$("#pgplm .fixtureQuantity").val();else if("sewer"==permits[t])e+="%0D%0A%0D%0ASewer Permit:%0D%0ABarricade days: "+$("#pgsewer .daysForBarricade").val()+"%0D%0ARight-of-way: "+$("#pgsewer rowRestoration").val()+"%0D%0AConnection type: "+$("#pgsewer .connectionType").val();else if("wtr"==permits[t])e+="%0D%0A%0D%0AWater Permit:%0D%0ABarricade days: "+$("#pgwtr .daysForBarricade").val()+"%0D%0AConnection type: "+$("#pgwtr .connectionType").val();else if("storm"==permits[t])e+="%0D%0A%0D%0AStorm Permit:%0D%0ABarricade days: "+$("#pgstorm .daysForBarricade").val()+"%0D%0ARight-of-way: "+$("#pgstorm .rowRestoration").val()+"%0D%0ADischarge point: "+$("#pgstorm .dischargePoint").val();else if("sitedev"==permits[t])e+="%0D%0A%0D%0ASite Development:%0D%0ACut area: "+$(".cutArea").val()+"%0D%0AFill area: "+$("#fillArea").val()+"%0D%0AClearing area: "+$("#clearingArea").val()+"%0D%0APaved area: "+$("#pavedArea").val();else if("demo"==permits[t])e+="%0D%0A%0D%0ADemolition:%0D%0AStructure type: "+$("#demoType").val()+"%0D%0ATotal area: "+$("#demoArea").val()+"%0D%0ATotal value: "+$("#demoCost").val();else if("sign"==permits[t])e+="%0D%0A%0D%0ASign:%0D%0ACost: "+$("#signCost").val();else if("land"==permits[t]){0==useRows.length&&(useRows.push($("#luPermitType").val()),useRows.push($("#luPermitSubtype").val()));for(var t=0;t<useRows.length;t+=2)e+="%0D%0ALand Use #"+(t+2)/2+": %0D%0ACategory: "+useRows[t]+"%0D%0ASubcategory: "+useRows[t+1]}else"fire"==permits[t]?(e+="%0D%0AFire boxes: ",$.each($("#pgfire input"),function(){0<$(this).val()?e+=$(this).val()+", ":e+="empty, "})):"event"==permits[t]?e+="%0D%0AEvent:%0D%0AResidential or commercial: "+$("#eventOrgType").val()+"%0D%0ABlocks Closed: "+$("#eventBlocks").val()+"%0D%0AEvent date: "+$("#eventDate").val():"row"==permits[t]&&(e+="%0D%0AROW:%0D%0AProject Type: "+$("#rowType").val(),"construction within (RCON)"==$("#rowType").val()?(e+="%0D%0ASidewalk work: "+$("#rowSidewalkWork").val(),"adding a new"==$("#rowSidewalkWork").val()&&(e+="%0D%0AGutter: "+$("#rowGutter").val(),"is"==$("#rowGutter").val())&&(e+="%0D%0AGutter length: "+$("#rowGutterLength").val()),e+="%0D%0ASidewalk size: "+$("#rowSidewalkSize").val(),"is"==$("#rowDriveway").val()&&(e+="%0D%0AAsphalt driveways: "+$("#rowAsphaltDrivewayNum").val()+"%0D%0AConcrete driveways: "+$("#rowConcreteDrivewayNum").val()),e+="%0D%0APaved area: "+$("#rowPaving").val()+"%0D%0ATrench type: "+$("#rowTrenchType").val(),"an open cut trench"==$("#rowTrenchType").val()?e+="%0D%0ATrench length: "+$("#rowTrenchLength").val():"a monitoring well, a bore, or potholing"==$("#rowTrenchType").val()&&(e+="%0D%0ABore count: "+$("#rowBoreCount").val())):"use of"==$("#rowType").val()?(e+="%0D%0AUse days: "+$("#rowUseDays").val()+"%0D%0ABanner: "+$("#rowBanner").val(),"will"==$("#rowBanner").val()&&(e+="%0D%0ABanner install: "+$("#rowBannerInstall").val()+"%0D%0ABanner blocks: "+$("#rowBannerBlocks").val()),e+="%0D%0ASMV: "+$("#rowSMV").val(),"will"==$("#rowSMV").val()&&(e+="%0D%0ASMV type: "+$("#rowSMVType").val())):"utility work in"==$("#rowType").val()&&("will"==$("#rowTrench").val()&&(e+="%0D%0ATrench length: "+$("#rowTrenchLength").val()),"will"==$("#rowBores").val())&&(e+="%0D%0ABore count: "+$("#rowBoreCount").val()),e+="%0D%0ABarricade days: "+$("#pgrow .daysForBarricade").val());e+="%0D%0A%0D%0AApp Version: v5.0.0";var i=window.open(e);setTimeout(function(){i.close()},100)}),$(document).on("click",".description-expand",function(){$(".description").toggleClass("open")}),$(document).on("click",".fee-item header",function(){$(this).siblings(".fee-sub-items").toggleClass("open"),$(this).children(".fa-caret-right").toggleClass("open")}),$(document).on("click","h4",function(){$(this).children("i").toggleClass("open"),$(this).siblings(".permit-category").toggleClass("open")}),$(document).on("click","button",function(e){e.preventDefault()}),$(document).keydown(function(e){37==e.keyCode?back():39!=e.keyCode&&13!=e.keyCode&&32!=e.keyCode||next()});