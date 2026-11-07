const assetPathPrefix = "/assets";
const imgDessets1 = `${assetPathPrefix}/4b1c5.png`;
const imgWaffle2 = `${assetPathPrefix}/52a48.png`;
const imgBiryani7 = `${assetPathPrefix}/ab8bd.png`;
const imgImage477 = `${assetPathPrefix}/4e4f7.png`;
const imgKachori3 = `${assetPathPrefix}/87b02.png`;
const imgParatha3 = `${assetPathPrefix}/1af0b.png`;
const imgBonda3 = `${assetPathPrefix}/8d705.png`;
const imgDosa3 = `${assetPathPrefix}/032d7.png`;
const imgParotta2 = `${assetPathPrefix}/13c75.png`;
const imgSouthIndian3 = `${assetPathPrefix}/50eed.png`;
const imgHandTap2 = `${assetPathPrefix}/93d0c.png`;
const imgGroup = `${assetPathPrefix}/7e2b8.svg`;
const imgVector = `${assetPathPrefix}/3da67.svg`;
const imgGroup1 = `${assetPathPrefix}/66e9f.svg`;
const imgGroup2 = `${assetPathPrefix}/c7ba6.svg`;
const imgGroup3 = `${assetPathPrefix}/d9e2f.svg`;
const imgGroup4 = `${assetPathPrefix}/a711e.svg`;
const imgGroup5 = `${assetPathPrefix}/0ef33.svg`;
const imgGroup6 = `${assetPathPrefix}/88295.svg`;
const imgVector1 = `${assetPathPrefix}/45f46.svg`;
const imgGroup7 = `${assetPathPrefix}/9c924.svg`;
const imgVector2 = `${assetPathPrefix}/c8b9b.svg`;
const imgGroup8 = `${assetPathPrefix}/80e39.svg`;
const imgGroup9 = `${assetPathPrefix}/3e432.svg`;
const imgGroup10 = `${assetPathPrefix}/83bc6.svg`;
const imgGroup11 = `${assetPathPrefix}/29bd1.svg`;
const imgGroup12 = `${assetPathPrefix}/8fde0.svg`;
const imgGroup13 = `${assetPathPrefix}/b6e0a.svg`;
const imgVector3 = `${assetPathPrefix}/07f78.svg`;
const imgVector4 = `${assetPathPrefix}/98c61.svg`;
const imgVector5 = `${assetPathPrefix}/fc801.svg`;
const imgGroup14 = `${assetPathPrefix}/66efe.svg`;
const imgGroup15 = `${assetPathPrefix}/4c3cf.svg`;
const imgGroup16 = `${assetPathPrefix}/42422.svg`;
const imgGroup17 = `${assetPathPrefix}/49e5c.svg`;
const imgGroup18 = `${assetPathPrefix}/0b939.svg`;
const imgGroup19 = `${assetPathPrefix}/31fce.svg`;
const imgVector6 = `${assetPathPrefix}/adc01.svg`;
const imgGroup20 = `${assetPathPrefix}/a492e.svg`;
const imgGroup21 = `${assetPathPrefix}/eb5f4.svg`;
const imgVector7 = `${assetPathPrefix}/5097a.svg`;
const imgGroup22 = `${assetPathPrefix}/89dc1.svg`;
const imgGroup23 = `${assetPathPrefix}/ca7e3.svg`;
const imgGroup24 = `${assetPathPrefix}/0bebf.svg`;
const imgEllipse1 = `${assetPathPrefix}/35619.svg`;
const imgUnion = `${assetPathPrefix}/393d0.svg`;
const imgUnion1 = `${assetPathPrefix}/ebcb8.svg`;
const imgUnion2 = `${assetPathPrefix}/b472e.svg`;
const imgArrowLeftAlt = `${assetPathPrefix}/916b0.svg`;

const selectedStateAssets: Record<string, string> = {
  Punjab: "/assets/selected/31fce.svg",
  "Uttar Pradesh": "/assets/selected/4c3cf.svg",
  "West Bengal": "/assets/selected/9c924.svg",
  Maharashtra: "/assets/selected/eb5f4.svg",
  Telangana: "/assets/selected/c8b9b.svg",
  "Andhra Pradesh": "/assets/selected/80e39.svg",
  Karnataka: "/assets/selected/b6e0a.svg",
  "Tamil Nadu": "/assets/selected/29bd1.svg",
  Kerala: "/assets/selected/8fde0.svg",
};

function StateLayer({
  state,
  dormantAsset,
  active,
}: {
  state: string;
  dormantAsset: string;
  active: boolean;
}) {
  return (
    <>
      {/* Both layers stay rendered so the selected colour cross-fades (opacity only). */}
      <img
        alt=""
        className={`absolute inset-0 block max-w-none size-full state-layer-dormant ${active ? "is-off" : ""}`}
        src={dormantAsset}
      />
      <img
        alt=""
        className={`absolute inset-0 block max-w-none size-full state-layer-selected ${active ? "is-on" : ""}`}
        src={selectedStateAssets[state]}
      />
    </>
  );
}

export default function MapArtwork({ selectedState }: { selectedState?: string }) {
  return (
    <div className="bg-[#fff7fb] overflow-clip relative rounded-[35px] size-full" data-node-id="2642:1371" data-name="Map not selected">
      <div className="-translate-x-1/2 absolute left-[calc(50%+14.5px)] size-[461px] top-[182px]" data-node-id="2642:1556" data-name="377027224_4781b506-dcc1-413b-9f06-b2a820af379f 8">
        <div className="absolute contents inset-[2.25%_5.57%_2.25%_5.58%]" data-node-id="2642:1557" data-name="Group">
          <div className="absolute contents inset-[2.25%_5.57%_2.57%_5.58%]" data-node-id="2642:1558" data-name="Group">
            <div className="absolute contents inset-[2.25%_5.57%_2.57%_5.58%]" data-node-id="2642:1559" data-name="Group">
              <div className="absolute contents inset-[42.27%_74.98%_42.78%_5.58%]" data-node-id="2642:1560" data-name="Group">
                <div className="absolute inset-[42.27%_74.98%_42.78%_5.58%]" data-node-id="2642:1561" data-name="Group">
                  <div className="absolute inset-[-0.7%_-0.56%_-0.73%_-0.56%]">
                    <img alt="" className="block max-w-none size-full" src={imgGroup} />
                  </div>
                </div>
              </div>
              <div className="absolute inset-[41.93%_16.07%_49.99%_80.26%]" data-node-id="2642:1565" data-name="Vector">
                <div className="absolute inset-[-1.34%_-2.96%_-1.34%_-3.06%]">
                  <img alt="" className="block max-w-none size-full" src={imgVector} />
                </div>
              </div>
              <div className="absolute contents inset-[37.62%_12.43%_56.42%_82.41%]" data-node-id="2642:1566" data-name="Group">
                <div className="absolute inset-[37.62%_12.43%_56.42%_82.41%]" data-node-id="2642:1567" data-name="Group">
                  <div className="absolute inset-[-1.82%_-2.1%]">
                    <img alt="" className="block max-w-none size-full" src={imgGroup1} />
                  </div>
                </div>
              </div>
              <div className="absolute inset-[32.94%_11.47%_60.67%_83.06%]" data-node-id="2642:1569" data-name="Group">
                <div className="absolute inset-[-1.7%_-3.04%_-1.7%_-1.98%]">
                  <img alt="" className="block max-w-none size-full" src={imgGroup2} />
                </div>
              </div>
              <div className="absolute inset-[24.83%_5.57%_65.75%_77.11%]" data-node-id="2642:1571" data-name="Group">
                <div className="absolute inset-[-1.15%_-0.63%]">
                  <img alt="" className="block max-w-none size-full" src={imgGroup3} />
                </div>
              </div>
              <div className="absolute contents inset-[41.83%_19.53%_52.76%_76.95%]" data-node-id="2642:1575" data-name="Group">
                <div className="absolute inset-[41.83%_19.53%_52.76%_76.95%]" data-node-id="2642:1576" data-name="Group">
                  <div className="absolute inset-[-4.73%_-7.68%_-2.01%_-3.08%]">
                    <img alt="" className="block max-w-none size-full" src={imgGroup4} />
                  </div>
                </div>
              </div>
              <div className="absolute inset-[29.64%_9.49%_56.7%_71.78%]" data-node-id="2642:1578" data-name="Group">
                <div className="absolute inset-[-0.79%_-0.58%_-0.79%_-0.76%]">
                  <img alt="" className="block max-w-none size-full" src={imgGroup5} />
                </div>
              </div>
              <div className="absolute inset-[36.85%_18.64%_59.73%_72.38%]" data-node-id="2642:1580" data-name="Group">
                <div className="absolute inset-[-3.17%_-1.21%_-3.55%_-1.21%]">
                  <img alt="" className="block max-w-none size-full" src={imgGroup6} />
                </div>
              </div>
              <div className="absolute inset-[31.02%_30.57%_65.47%_66.57%]" data-node-id="2642:1582" data-name="Vector">
                <div className="absolute inset-[-3.09%_-3.79%_-3.09%_-3.86%]">
                  <img alt="" className="block max-w-none size-full" src={imgVector1} />
                </div>
              </div>
              <div className="absolute inset-[33.87%_27.76%_47.66%_60.53%]" data-node-id="2642:1583" data-name="Group">
                <div className="absolute inset-[-0.14%_-0.93%_-0.61%_-0.93%]">
                  <StateLayer state="West Bengal" dormantAsset={imgGroup7} active={selectedState === "West Bengal"} />
                </div>
              </div>
              <div className="absolute inset-[58.44%_52.27%_28.33%_33.66%]" data-node-id="2642:1585" data-name="Vector">
                <div className="absolute inset-[-0.82%_-0.77%]">
                  <StateLayer state="Telangana" dormantAsset={imgVector2} active={selectedState === "Telangana"} />
                </div>
              </div>
              <div className="absolute inset-[60.62%_42.13%_17.99%_31.62%]" data-node-id="2642:1586" data-name="Group">
                <div className="absolute inset-[-0.41%_-0.54%_-0.51%_-0.41%]">
                  <StateLayer state="Andhra Pradesh" dormantAsset={imgGroup8} active={selectedState === "Andhra Pradesh"} />
                </div>
              </div>
              <div className="absolute inset-[50.97%_29.09%_47.51%_67.65%]" data-node-id="2642:1589" data-name="Group">
                <div className="absolute inset-[-7.18%_-3.33%_-7.17%_-3.33%]">
                  <img alt="" className="block max-w-none size-full" src={imgGroup9} />
                </div>
              </div>
              <div className="absolute inset-[49.47%_34.02%_34.77%_46.92%]" data-node-id="2642:1600" data-name="Group">
                <div className="absolute inset-[-0.69%_-1.29%_-0.69%_-0.57%]">
                  <img alt="" className="block max-w-none size-full" src={imgGroup10} />
                </div>
              </div>
              <div className="absolute contents inset-[79.1%_56.58%_2.57%_29.55%]" data-node-id="2642:1602" data-name="Group">
                <div className="absolute inset-[79.1%_56.58%_2.57%_29.55%]" data-node-id="2642:1603" data-name="Group">
                  <div className="absolute inset-[-0.59%_-0.78%]">
                    <StateLayer state="Tamil Nadu" dormantAsset={imgGroup11} active={selectedState === "Tamil Nadu"} />
                  </div>
                </div>
              </div>
              <div className="absolute inset-[81.62%_66.68%_3.79%_25.13%]" data-node-id="2642:1605" data-name="Group">
                <div className="absolute inset-[-0.74%_-1.32%_-0.89%_-1.58%]">
                  <StateLayer state="Kerala" dormantAsset={imgGroup12} active={selectedState === "Kerala"} />
                </div>
              </div>
              <div className="absolute inset-[62.78%_62.58%_14.5%_22.81%]" data-node-id="2642:1607" data-name="Group">
                <div className="absolute inset-[-0.48%_-0.74%_-0.48%_-1.17%]">
                  <StateLayer state="Karnataka" dormantAsset={imgGroup13} active={selectedState === "Karnataka"} />
                </div>
              </div>
              <div className="absolute inset-[40.22%_33.36%_48.58%_52.8%]" data-node-id="2642:1609" data-name="Vector">
                <div className="absolute inset-[-0.97%_-0.78%]">
                  <img alt="" className="block max-w-none size-full" src={imgVector3} />
                </div>
              </div>
              <div className="absolute inset-[44.76%_43.97%_34.75%_43.06%]" data-node-id="2642:1610" data-name="Vector">
                <div className="absolute inset-[-0.55%_-0.84%_-0.53%_-0.84%]">
                  <img alt="" className="block max-w-none size-full" src={imgVector4} />
                </div>
              </div>
              <div className="absolute inset-[35.97%_49.07%_45.62%_23.55%]" data-node-id="2642:1611" data-name="Vector">
                <div className="absolute inset-[-0.59%_-0.4%]">
                  <img alt="" className="block max-w-none size-full" src={imgVector5} />
                </div>
              </div>
              <div className="absolute inset-[33.59%_32.55%_56.02%_52.61%]" data-node-id="2642:1612" data-name="Group">
                <div className="absolute inset-[-1.04%_-0.73%]">
                  <img alt="" className="block max-w-none size-full" src={imgGroup14} />
                </div>
              </div>
              <div className="absolute contents inset-[24.43%_43.6%_54.4%_33.54%]" data-node-id="2642:1614" data-name="Group">
                <div className="absolute inset-[24.43%_43.6%_54.4%_33.54%]" data-node-id="2642:1615" data-name="Group">
                  <div className="absolute inset-[-0.51%_-0.47%]">
                    <StateLayer state="Uttar Pradesh" dormantAsset={imgGroup15} active={selectedState === "Uttar Pradesh"} />
                  </div>
                </div>
              </div>
              <div className="absolute contents inset-[20.96%_54.46%_70.17%_35.23%]" data-node-id="2642:1622" data-name="Group">
                <div className="absolute inset-[20.96%_54.46%_70.17%_35.23%]" data-node-id="2642:1623" data-name="Group">
                  <div className="absolute inset-[-1.22%_-1.05%_-1.22%_-1.67%]">
                    <img alt="" className="block max-w-none size-full" src={imgGroup16} />
                  </div>
                </div>
              </div>
              <div className="absolute contents inset-[15.18%_60.8%_75.46%_29.62%]" data-node-id="2642:1625" data-name="Group">
                <div className="absolute inset-[15.18%_60.8%_75.46%_29.62%]" data-node-id="2642:1626" data-name="Group">
                  <div className="absolute inset-[-1.16%_-1.13%_-1.76%_-1.13%]">
                    <img alt="" className="block max-w-none size-full" src={imgGroup17} />
                  </div>
                </div>
              </div>
              <div className="absolute contents inset-[2.25%_56.72%_81.91%_21.41%]" data-node-id="2642:1628" data-name="Group">
                <div className="absolute inset-[2.25%_56.72%_81.91%_21.41%]" data-node-id="2642:1629" data-name="Group">
                  <div className="absolute inset-[-0.68%_-0.5%]">
                    <img alt="" className="block max-w-none size-full" src={imgGroup18} />
                  </div>
                </div>
              </div>
              <div className="absolute contents inset-[17.44%_66.74%_73.05%_24.42%]" data-node-id="2642:1631" data-name="Group">
                <div className="absolute inset-[17.44%_66.74%_73.05%_24.42%]" data-node-id="2642:1632" data-name="Group">
                  <div className="absolute inset-[-1.98%_-1.23%_-1.14%_-1.23%]">
                    <StateLayer state="Punjab" dormantAsset={imgGroup19} active={selectedState === "Punjab"} />
                  </div>
                </div>
              </div>
              <div className="absolute inset-[22.96%_64.82%_66.71%_25.95%]" data-node-id="2642:1634" data-name="Vector">
                <div className="absolute inset-[-1.2%_-1.46%_-1.05%_-1.17%]">
                  <img alt="" className="block max-w-none size-full" src={imgVector6} />
                </div>
              </div>
              <div className="absolute contents inset-[24.81%_62.81%_51.92%_10.55%]" data-node-id="2642:1635" data-name="Group">
                <div className="absolute inset-[24.81%_62.81%_51.92%_10.55%]" data-node-id="2642:1636" data-name="Group">
                  <div className="absolute inset-[-0.71%_-0.37%_-0.95%_-0.41%]">
                    <img alt="" className="block max-w-none size-full" src={imgGroup20} />
                  </div>
                </div>
              </div>
              <div className="absolute inset-[51.35%_54.93%_25.62%_18.89%]" data-node-id="2642:1638" data-name="Group">
                <div className="absolute inset-[-0.47%_-0.41%_-0.56%_-0.41%]">
                  <StateLayer state="Maharashtra" dormantAsset={imgGroup21} active={selectedState === "Maharashtra"} />
                </div>
              </div>
              <div className="absolute inset-[71.89%_76.58%_25.62%_21.51%]" data-node-id="2642:1640" data-name="Vector">
                <div className="absolute inset-[-4.72%_-5.68%_-5.16%_-5.68%]">
                  <img alt="" className="block max-w-none size-full" src={imgVector7} />
                </div>
              </div>
            </div>
            <div className="absolute inset-[15.13%_9.45%_3.74%_14.64%]" data-node-id="2642:1641" data-name="Group">
              <div className="absolute inset-[-0.13%_-0.14%_-0.13%_-0.29%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup22} />
              </div>
            </div>
          </div>
          <div className="absolute contents inset-[75.95%_7.7%_2.25%_84.29%]" data-node-id="2642:2474" data-name="Group">
            <div className="absolute inset-[75.95%_7.7%_2.25%_84.29%]" data-node-id="2642:2475" data-name="Group">
              <div className="absolute inset-[-0.5%_-1.36%]">
                <img alt="" className="block max-w-none size-full" src={imgGroup23} />
              </div>
            </div>
          </div>
          <div className="absolute inset-[93.4%_57.71%_6.13%_41.7%]" data-node-id="2642:2485" data-name="Group">
            <div className="absolute inset-[-23.09%_-18.56%]">
              <img alt="" className="block max-w-none size-full" src={imgGroup24} />
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex items-center justify-center left-[calc(50%-143.53px)] top-[calc(50%+16.65px)]" data-node-id="2642:2722">
          <div className="bg-white content-stretch flex items-center justify-center mr-[-1px] overflow-clip px-[6px] relative rounded-[12px] shadow-[0px_16px_48px_0px_rgba(0,0,0,0.14),0px_8px_24px_0px_rgba(0,0,0,0.1)] shrink-0" data-node-id="2651:4195">
            <p className="[word-break:break-word] font-['Figtree'] font-medium leading-[18px] relative shrink-0 text-[10px] text-black tracking-[-0.2px] whitespace-nowrap" data-node-id="2651:4196" style={{ fontFeatureSettings: '"dlig" 1' }}>
              Maharashtra
            </p>
          </div>
          <a className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="2651:4171">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-node-id="2651:4172">
              <div className="col-1 h-[4px] ml-[7.17px] mt-[46px] relative row-1 w-[40px]" data-node-id="2651:4173">
                <div className="absolute inset-[-125%_-12.5%]">
                  <img alt="" className="block max-w-none size-full" src={imgEllipse1} />
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] h-[44.811px] inline-grid ml-[12.14px] mt-[6px] place-items-start relative row-1 w-[40.8px]" data-node-id="2651:4174">
                <div className="col-1 flex h-[44.811px] items-center justify-center ml-0 mt-0 relative row-1 w-[40.8px]" data-node-id="2651:4175">
                  <div className="flex-none rotate-16">
                    <div className="h-[37.532px] relative w-[31.682px]" data-name="Union">
                      <div className="absolute inset-[-79.82%_-141.83%_-159.63%_-141.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgUnion} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 flex items-center justify-center ml-[1.76px] mt-[1.76px] relative row-1 size-[34.833px]" data-node-id="2651:4178">
                  <div className="flex-none rotate-16">
                    <div className="bg-[#ffb3d6] relative rounded-[7.04px] size-[28.162px]">
                      <div className="absolute left-[2.96px] size-[22.233px] top-[3.71px]" data-node-id="2651:4179" data-name="Dessets 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDessets1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] h-[46.105px] inline-grid ml-0 mt-[6.2px] place-items-start relative row-1 w-[42.608px]" data-node-id="2651:4180">
                <div className="col-1 flex h-[46.105px] items-center justify-center ml-0 mt-0 relative row-1 w-[42.608px]" data-node-id="2651:4181">
                  <div className="-rotate-20 flex-none">
                    <div className="h-[37.532px] relative w-[31.682px]" data-name="Union">
                      <div className="absolute inset-[-79.82%_-141.83%_-159.63%_-141.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgUnion1} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 flex items-center justify-center ml-[1.76px] mt-[1.76px] relative row-1 size-[36.095px]" data-node-id="2651:4184">
                  <div className="-rotate-20 flex-none">
                    <div className="bg-[#ffb3d6] relative rounded-[7.04px] size-[28.162px]">
                      <div className="absolute left-[2.96px] size-[22.233px] top-[3.71px]" data-node-id="2651:4185" data-name="Dessets 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDessets1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[9.17px] mt-[5px] place-items-start relative row-1" data-node-id="2651:4186">
                <div className="col-1 h-[42.648px] ml-0 mt-0 relative row-1 w-[36px]" data-node-id="2651:4187" data-name="Union">
                  <div className="absolute inset-[-56.27%_-88.89%_-93.79%_-88.89%]">
                    <img alt="" className="block max-w-none size-full" src={imgUnion2} />
                  </div>
                </div>
                <div className="bg-[#ff80b8] col-1 ml-[2px] mt-[2px] relative rounded-[8px] row-1 size-[32px]" data-node-id="2651:4190">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-0.17px)] size-[28px] top-1/2" data-node-id="2651:4191" data-name="Waffle 2">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgWaffle2} />
                  </div>
                </div>
              </div>
              <div className="bg-white col-1 ml-[33.17px] mt-0 relative rounded-[888px] row-1 size-[16px]" data-node-id="2651:4192">
                <p className="[word-break:break-word] absolute font-['Figtree'] font-bold leading-[normal] left-[4.89px] right-[5.78px] text-[10.667px] text-black top-[1.78px] tracking-[-0.64px]" data-node-id="2651:4193">
                  6
                </p>
              </div>
            </div>
          </a>
        </div>
        <div className="absolute content-stretch flex inset-[52.71%_43.51%_35.94%_33.08%] items-center justify-center" data-node-id="2642:2513">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-1px] place-items-start relative shrink-0" data-node-id="2642:2514">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-node-id="2642:2515">
              <div className="col-1 h-[4px] ml-[7.17px] mt-[46px] relative row-1 w-[40px]" data-node-id="2642:2516">
                <div className="absolute inset-[-125%_-12.5%]">
                  <img alt="" className="block max-w-none size-full" src={imgEllipse1} />
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] h-[44.811px] inline-grid ml-[12.14px] mt-[6px] place-items-start relative row-1 w-[40.8px]" data-node-id="2642:2517">
                <div className="col-1 flex h-[44.811px] items-center justify-center ml-0 mt-0 relative row-1 w-[40.8px]" data-node-id="2642:2518">
                  <div className="flex-none rotate-16">
                    <div className="h-[37.532px] relative w-[31.682px]" data-name="Union">
                      <div className="absolute inset-[-79.82%_-141.83%_-159.63%_-141.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgUnion} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 flex items-center justify-center ml-[1.76px] mt-[1.76px] relative row-1 size-[34.833px]" data-node-id="2642:2521">
                  <div className="flex-none rotate-16">
                    <div className="bg-[#ffb3d6] relative rounded-[7.04px] size-[28.162px]">
                      <div className="absolute left-[2.96px] size-[22.233px] top-[3.71px]" data-node-id="2642:2522" data-name="Dessets 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDessets1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] h-[46.105px] inline-grid ml-0 mt-[6.2px] place-items-start relative row-1 w-[42.608px]" data-node-id="2642:2523">
                <div className="col-1 flex h-[46.105px] items-center justify-center ml-0 mt-0 relative row-1 w-[42.608px]" data-node-id="2642:2524">
                  <div className="-rotate-20 flex-none">
                    <div className="h-[37.532px] relative w-[31.682px]" data-name="Union">
                      <div className="absolute inset-[-79.82%_-141.83%_-159.63%_-141.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgUnion1} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 flex items-center justify-center ml-[1.76px] mt-[1.76px] relative row-1 size-[36.095px]" data-node-id="2642:2527">
                  <div className="-rotate-20 flex-none">
                    <div className="bg-[#ffb3d6] relative rounded-[7.04px] size-[28.162px]">
                      <div className="absolute left-[2.96px] size-[22.233px] top-[3.71px]" data-node-id="2642:2528" data-name="Dessets 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDessets1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[9.17px] mt-[5px] place-items-start relative row-1" data-node-id="2642:2529">
                <div className="col-1 h-[42.648px] ml-0 mt-0 relative row-1 w-[36px]" data-node-id="2642:2530" data-name="Union">
                  <div className="absolute inset-[-56.27%_-88.89%_-93.79%_-88.89%]">
                    <img alt="" className="block max-w-none size-full" src={imgUnion2} />
                  </div>
                </div>
                <div className="bg-[#ff80b8] col-1 ml-[2px] mt-[2px] relative rounded-[8px] row-1 size-[32px]" data-node-id="2642:2533">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.33px)] size-[28px] top-1/2" data-node-id="2675:1866" data-name="Biryani 7">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBiryani7} />
                  </div>
                </div>
              </div>
              <div className="bg-white col-1 ml-[33.17px] mt-0 relative rounded-[888px] row-1 size-[16px]" data-node-id="2642:2535">
                <p className="[word-break:break-word] absolute font-['Figtree'] font-bold leading-[normal] left-[4.89px] right-[5.78px] text-[10.667px] text-black top-[1.78px] tracking-[-0.64px]" data-node-id="2642:2536">
                  2
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white content-stretch flex items-center justify-center overflow-clip px-[6px] relative rounded-[12px] shadow-[0px_16px_48px_0px_rgba(0,0,0,0.14),0px_8px_24px_0px_rgba(0,0,0,0.1)] shrink-0" data-node-id="2642:2537">
            <p className="[word-break:break-word] font-['Figtree'] font-medium leading-[18px] relative shrink-0 text-[10px] text-black tracking-[-0.2px] whitespace-nowrap" data-node-id="2642:2538" style={{ fontFeatureSettings: '"dlig" 1' }}>
              Telangana
            </p>
          </div>
        </div>
        <div className="absolute content-stretch flex inset-[37.53%_12.59%_51.13%_61.61%] items-center justify-center" data-node-id="2642:2539">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-1px] place-items-start relative shrink-0" data-node-id="2642:2540">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-node-id="2642:2541">
              <div className="col-1 h-[4px] ml-[7.17px] mt-[46px] relative row-1 w-[40px]" data-node-id="2642:2542">
                <div className="absolute inset-[-125%_-12.5%]">
                  <img alt="" className="block max-w-none size-full" src={imgEllipse1} />
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] h-[44.811px] inline-grid ml-[12.14px] mt-[6px] place-items-start relative row-1 w-[40.8px]" data-node-id="2642:2543">
                <div className="col-1 flex h-[44.811px] items-center justify-center ml-0 mt-0 relative row-1 w-[40.8px]" data-node-id="2642:2544">
                  <div className="flex-none rotate-16">
                    <div className="h-[37.532px] relative w-[31.682px]" data-name="Union">
                      <div className="absolute inset-[-79.82%_-141.83%_-159.63%_-141.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgUnion} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 flex items-center justify-center ml-[1.76px] mt-[1.76px] relative row-1 size-[34.833px]" data-node-id="2642:2547">
                  <div className="flex-none rotate-16">
                    <div className="bg-[#ffb3d6] relative rounded-[7.04px] size-[28.162px]">
                      <div className="absolute left-[2.96px] size-[22.233px] top-[3.71px]" data-node-id="2642:2548" data-name="Dessets 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDessets1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] h-[46.105px] inline-grid ml-0 mt-[6.2px] place-items-start relative row-1 w-[42.608px]" data-node-id="2642:2549">
                <div className="col-1 flex h-[46.105px] items-center justify-center ml-0 mt-0 relative row-1 w-[42.608px]" data-node-id="2642:2550">
                  <div className="-rotate-20 flex-none">
                    <div className="h-[37.532px] relative w-[31.682px]" data-name="Union">
                      <div className="absolute inset-[-79.82%_-141.83%_-159.63%_-141.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgUnion1} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 flex items-center justify-center ml-[1.76px] mt-[1.76px] relative row-1 size-[36.095px]" data-node-id="2642:2553">
                  <div className="-rotate-20 flex-none">
                    <div className="bg-[#ffb3d6] relative rounded-[7.04px] size-[28.162px]">
                      <div className="absolute left-[2.96px] size-[22.233px] top-[3.71px]" data-node-id="2642:2554" data-name="Dessets 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDessets1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[9.17px] mt-[5px] place-items-start relative row-1" data-node-id="2642:2555">
                <div className="col-1 h-[42.648px] ml-0 mt-0 relative row-1 w-[36px]" data-node-id="2642:2556" data-name="Union">
                  <div className="absolute inset-[-56.27%_-88.89%_-93.79%_-88.89%]">
                    <img alt="" className="block max-w-none size-full" src={imgUnion2} />
                  </div>
                </div>
                <div className="bg-[#ff80b8] col-1 ml-[2px] mt-[2px] relative rounded-[8px] row-1 size-[32px]" data-node-id="2642:2559">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-0.17px)] size-[28px] top-1/2" data-node-id="2675:1885" data-name="image 477">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage477} />
                  </div>
                </div>
              </div>
              <div className="bg-white col-1 ml-[33.17px] mt-0 relative rounded-[888px] row-1 size-[16px]" data-node-id="2642:2561">
                <p className="[word-break:break-word] absolute font-['Figtree'] font-bold leading-[normal] left-[4.89px] right-[5.78px] text-[10.667px] text-black top-[1.78px] tracking-[-0.64px]" data-node-id="2642:2562">
                  5
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white content-stretch flex items-center justify-center overflow-clip px-[6px] relative rounded-[12px] shadow-[0px_16px_48px_0px_rgba(0,0,0,0.14),0px_8px_24px_0px_rgba(0,0,0,0.1)] shrink-0" data-node-id="2642:2563">
            <p className="[word-break:break-word] font-['Figtree'] font-medium leading-[18px] relative shrink-0 text-[10px] text-black tracking-[-0.2px] whitespace-nowrap" data-node-id="2642:2564" style={{ fontFeatureSettings: '"dlig" 1' }}>
              West Bengal
            </p>
          </div>
        </div>
        <div className="absolute content-stretch flex inset-[26.68%_34.07%_61.97%_39.05%] items-center justify-center" data-node-id="2642:2565">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-1px] place-items-start relative shrink-0" data-node-id="2642:2566">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-node-id="2642:2567">
              <div className="col-1 h-[4px] ml-[7.17px] mt-[46px] relative row-1 w-[40px]" data-node-id="2642:2568">
                <div className="absolute inset-[-125%_-12.5%]">
                  <img alt="" className="block max-w-none size-full" src={imgEllipse1} />
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] h-[44.811px] inline-grid ml-[12.14px] mt-[6px] place-items-start relative row-1 w-[40.8px]" data-node-id="2642:2569">
                <div className="col-1 flex h-[44.811px] items-center justify-center ml-0 mt-0 relative row-1 w-[40.8px]" data-node-id="2642:2570">
                  <div className="flex-none rotate-16">
                    <div className="h-[37.532px] relative w-[31.682px]" data-name="Union">
                      <div className="absolute inset-[-79.82%_-141.83%_-159.63%_-141.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgUnion} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 flex items-center justify-center ml-[1.76px] mt-[1.76px] relative row-1 size-[34.833px]" data-node-id="2642:2573">
                  <div className="flex-none rotate-16">
                    <div className="bg-[#ffb3d6] relative rounded-[7.04px] size-[28.162px]">
                      <div className="absolute left-[2.96px] size-[22.233px] top-[3.71px]" data-node-id="2642:2574" data-name="Dessets 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDessets1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] h-[46.105px] inline-grid ml-0 mt-[6.2px] place-items-start relative row-1 w-[42.608px]" data-node-id="2642:2575">
                <div className="col-1 flex h-[46.105px] items-center justify-center ml-0 mt-0 relative row-1 w-[42.608px]" data-node-id="2642:2576">
                  <div className="-rotate-20 flex-none">
                    <div className="h-[37.532px] relative w-[31.682px]" data-name="Union">
                      <div className="absolute inset-[-79.82%_-141.83%_-159.63%_-141.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgUnion1} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 flex items-center justify-center ml-[1.76px] mt-[1.76px] relative row-1 size-[36.095px]" data-node-id="2642:2579">
                  <div className="-rotate-20 flex-none">
                    <div className="bg-[#ffb3d6] relative rounded-[7.04px] size-[28.162px]">
                      <div className="absolute left-[2.96px] size-[22.233px] top-[3.71px]" data-node-id="2642:2580" data-name="Dessets 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDessets1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[9.17px] mt-[5px] place-items-start relative row-1" data-node-id="2642:2581">
                <div className="col-1 h-[42.648px] ml-0 mt-0 relative row-1 w-[36px]" data-node-id="2642:2582" data-name="Union">
                  <div className="absolute inset-[-56.27%_-88.89%_-93.79%_-88.89%]">
                    <img alt="" className="block max-w-none size-full" src={imgUnion2} />
                  </div>
                </div>
                <div className="bg-[#ff80b8] col-1 ml-[2px] mt-[2px] relative rounded-[8px] row-1 size-[32px]" data-node-id="2642:2585">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-0.17px)] size-[28px] top-1/2" data-node-id="2675:1879" data-name="Kachori 3">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgKachori3} />
                  </div>
                </div>
              </div>
              <div className="bg-white col-1 ml-[33.17px] mt-0 relative rounded-[888px] row-1 size-[16px]" data-node-id="2642:2587">
                <p className="[word-break:break-word] absolute font-['Figtree'] font-bold leading-[normal] left-[4.89px] right-[5.78px] text-[10.667px] text-black top-[1.78px] tracking-[-0.64px]" data-node-id="2642:2588">
                  4
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white content-stretch flex items-center justify-center overflow-clip px-[6px] relative rounded-[12px] shadow-[0px_16px_48px_0px_rgba(0,0,0,0.14),0px_8px_24px_0px_rgba(0,0,0,0.1)] shrink-0" data-node-id="2642:2589">
            <p className="[word-break:break-word] font-['Figtree'] font-medium leading-[18px] relative shrink-0 text-[10px] text-black tracking-[-0.2px] whitespace-nowrap" data-node-id="2642:2590" style={{ fontFeatureSettings: '"dlig" 1' }}>
              Uttar Pradesh
            </p>
          </div>
        </div>
        <div className="absolute content-stretch flex inset-[13.23%_55.87%_75.42%_23.75%] items-center justify-center" data-node-id="2642:2591">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-1px] place-items-start relative shrink-0" data-node-id="2642:2592">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-node-id="2642:2593">
              <div className="col-1 h-[4px] ml-[7.17px] mt-[46px] relative row-1 w-[40px]" data-node-id="2642:2594">
                <div className="absolute inset-[-125%_-12.5%]">
                  <img alt="" className="block max-w-none size-full" src={imgEllipse1} />
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] h-[44.811px] inline-grid ml-[12.14px] mt-[6px] place-items-start relative row-1 w-[40.8px]" data-node-id="2642:2595">
                <div className="col-1 flex h-[44.811px] items-center justify-center ml-0 mt-0 relative row-1 w-[40.8px]" data-node-id="2642:2596">
                  <div className="flex-none rotate-16">
                    <div className="h-[37.532px] relative w-[31.682px]" data-name="Union">
                      <div className="absolute inset-[-79.82%_-141.83%_-159.63%_-141.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgUnion} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 flex items-center justify-center ml-[1.76px] mt-[1.76px] relative row-1 size-[34.833px]" data-node-id="2642:2599">
                  <div className="flex-none rotate-16">
                    <div className="bg-[#ffb3d6] relative rounded-[7.04px] size-[28.162px]">
                      <div className="absolute left-[2.96px] size-[22.233px] top-[3.71px]" data-node-id="2642:2600" data-name="Dessets 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDessets1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] h-[46.105px] inline-grid ml-0 mt-[6.2px] place-items-start relative row-1 w-[42.608px]" data-node-id="2642:2601">
                <div className="col-1 flex h-[46.105px] items-center justify-center ml-0 mt-0 relative row-1 w-[42.608px]" data-node-id="2642:2602">
                  <div className="-rotate-20 flex-none">
                    <div className="h-[37.532px] relative w-[31.682px]" data-name="Union">
                      <div className="absolute inset-[-79.82%_-141.83%_-159.63%_-141.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgUnion1} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 flex items-center justify-center ml-[1.76px] mt-[1.76px] relative row-1 size-[36.095px]" data-node-id="2642:2605">
                  <div className="-rotate-20 flex-none">
                    <div className="bg-[#ffb3d6] relative rounded-[7.04px] size-[28.162px]">
                      <div className="absolute left-[2.96px] size-[22.233px] top-[3.71px]" data-node-id="2642:2606" data-name="Dessets 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDessets1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[9.17px] mt-[5px] place-items-start relative row-1" data-node-id="2642:2607">
                <div className="col-1 h-[42.648px] ml-0 mt-0 relative row-1 w-[36px]" data-node-id="2642:2608" data-name="Union">
                  <div className="absolute inset-[-56.27%_-88.89%_-93.79%_-88.89%]">
                    <img alt="" className="block max-w-none size-full" src={imgUnion2} />
                  </div>
                </div>
                <div className="bg-[#ff80b8] col-1 ml-[2px] mt-[2px] relative rounded-[8px] row-1 size-[32px]" data-node-id="2642:2611">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.33px)] size-[28px] top-1/2" data-node-id="2675:1882" data-name="Paratha 3">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgParatha3} />
                  </div>
                </div>
              </div>
              <div className="bg-white col-1 ml-[33.17px] mt-0 relative rounded-[888px] row-1 size-[16px]" data-node-id="2642:2613">
                <p className="[word-break:break-word] absolute font-['Figtree'] font-bold leading-[normal] left-[4.89px] right-[5.78px] text-[10.667px] text-black top-[1.78px] tracking-[-0.64px]" data-node-id="2642:2614">
                  5
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white content-stretch flex items-center justify-center overflow-clip px-[6px] relative rounded-[12px] shadow-[0px_16px_48px_0px_rgba(0,0,0,0.14),0px_8px_24px_0px_rgba(0,0,0,0.1)] shrink-0" data-node-id="2642:2615">
            <p className="[word-break:break-word] font-['Figtree'] font-medium leading-[18px] relative shrink-0 text-[10px] text-black tracking-[-0.2px] whitespace-nowrap" data-node-id="2642:2616" style={{ fontFeatureSettings: '"dlig" 1' }}>
              Punjab
            </p>
          </div>
        </div>
        <div className="absolute content-stretch flex inset-[62.91%_34.5%_25.75%_36.66%] items-center justify-center" data-node-id="2642:2617">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-1px] place-items-start relative shrink-0" data-node-id="2642:2618">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-node-id="2642:2619">
              <div className="col-1 h-[4px] ml-[7.17px] mt-[46px] relative row-1 w-[40px]" data-node-id="2642:2620">
                <div className="absolute inset-[-125%_-12.5%]">
                  <img alt="" className="block max-w-none size-full" src={imgEllipse1} />
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] h-[44.811px] inline-grid ml-[12.14px] mt-[6px] place-items-start relative row-1 w-[40.8px]" data-node-id="2642:2621">
                <div className="col-1 flex h-[44.811px] items-center justify-center ml-0 mt-0 relative row-1 w-[40.8px]" data-node-id="2642:2622">
                  <div className="flex-none rotate-16">
                    <div className="h-[37.532px] relative w-[31.682px]" data-name="Union">
                      <div className="absolute inset-[-79.82%_-141.83%_-159.63%_-141.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgUnion} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 flex items-center justify-center ml-[1.76px] mt-[1.76px] relative row-1 size-[34.833px]" data-node-id="2642:2625">
                  <div className="flex-none rotate-16">
                    <div className="bg-[#ffb3d6] relative rounded-[7.04px] size-[28.162px]">
                      <div className="absolute left-[2.96px] size-[22.233px] top-[3.71px]" data-node-id="2642:2626" data-name="Dessets 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDessets1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] h-[46.105px] inline-grid ml-0 mt-[6.2px] place-items-start relative row-1 w-[42.608px]" data-node-id="2642:2627">
                <div className="col-1 flex h-[46.105px] items-center justify-center ml-0 mt-0 relative row-1 w-[42.608px]" data-node-id="2642:2628">
                  <div className="-rotate-20 flex-none">
                    <div className="h-[37.532px] relative w-[31.682px]" data-name="Union">
                      <div className="absolute inset-[-79.82%_-141.83%_-159.63%_-141.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgUnion1} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 flex items-center justify-center ml-[1.76px] mt-[1.76px] relative row-1 size-[36.095px]" data-node-id="2642:2631">
                  <div className="-rotate-20 flex-none">
                    <div className="bg-[#ffb3d6] relative rounded-[7.04px] size-[28.162px]">
                      <div className="absolute left-[2.96px] size-[22.233px] top-[3.71px]" data-node-id="2642:2632" data-name="Dessets 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDessets1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[9.17px] mt-[5px] place-items-start relative row-1" data-node-id="2642:2633">
                <div className="col-1 h-[42.648px] ml-0 mt-0 relative row-1 w-[36px]" data-node-id="2642:2634" data-name="Union">
                  <div className="absolute inset-[-56.27%_-88.89%_-93.79%_-88.89%]">
                    <img alt="" className="block max-w-none size-full" src={imgUnion2} />
                  </div>
                </div>
                <div className="bg-[#ff80b8] col-1 ml-[2px] mt-[2px] relative rounded-[8px] row-1 size-[32px]" data-node-id="2642:2637">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-0.17px)] size-[28px] top-1/2" data-node-id="2675:1863" data-name="Bonda 3">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBonda3} />
                  </div>
                </div>
              </div>
              <div className="bg-white col-1 ml-[33.17px] mt-0 relative rounded-[888px] row-1 size-[16px]" data-node-id="2642:2639">
                <p className="[word-break:break-word] absolute font-['Figtree'] font-bold leading-[normal] left-[4.89px] right-[5.78px] text-[10.667px] text-black top-[1.78px] tracking-[-0.64px]" data-node-id="2642:2640">
                  6
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white content-stretch flex items-center justify-center overflow-clip px-[6px] relative rounded-[12px] shadow-[0px_16px_48px_0px_rgba(0,0,0,0.14),0px_8px_24px_0px_rgba(0,0,0,0.1)] shrink-0" data-node-id="2642:2641">
            <p className="[word-break:break-word] font-['Figtree'] font-medium leading-[18px] relative shrink-0 text-[10px] text-black tracking-[-0.2px] whitespace-nowrap" data-node-id="2642:2642" style={{ fontFeatureSettings: '"dlig" 1' }}>
              Andhra Pradesh
            </p>
          </div>
        </div>
        <div className="absolute content-stretch flex inset-[74.62%_41.34%_14.03%_34.16%] items-center justify-center" data-node-id="2642:2643">
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] mr-[-1px] place-items-start relative shrink-0" data-node-id="2642:2644">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-node-id="2642:2645">
              <div className="col-1 h-[4px] ml-[7.17px] mt-[46px] relative row-1 w-[40px]" data-node-id="2642:2646">
                <div className="absolute inset-[-125%_-12.5%]">
                  <img alt="" className="block max-w-none size-full" src={imgEllipse1} />
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] h-[44.811px] inline-grid ml-[12.14px] mt-[6px] place-items-start relative row-1 w-[40.8px]" data-node-id="2642:2647">
                <div className="col-1 flex h-[44.811px] items-center justify-center ml-0 mt-0 relative row-1 w-[40.8px]" data-node-id="2642:2648">
                  <div className="flex-none rotate-16">
                    <div className="h-[37.532px] relative w-[31.682px]" data-name="Union">
                      <div className="absolute inset-[-79.82%_-141.83%_-159.63%_-141.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgUnion} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 flex items-center justify-center ml-[1.76px] mt-[1.76px] relative row-1 size-[34.833px]" data-node-id="2642:2651">
                  <div className="flex-none rotate-16">
                    <div className="bg-[#ffb3d6] relative rounded-[7.04px] size-[28.162px]">
                      <div className="absolute left-[2.96px] size-[22.233px] top-[3.71px]" data-node-id="2642:2652" data-name="Dessets 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDessets1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] h-[46.105px] inline-grid ml-0 mt-[6.2px] place-items-start relative row-1 w-[42.608px]" data-node-id="2642:2653">
                <div className="col-1 flex h-[46.105px] items-center justify-center ml-0 mt-0 relative row-1 w-[42.608px]" data-node-id="2642:2654">
                  <div className="-rotate-20 flex-none">
                    <div className="h-[37.532px] relative w-[31.682px]" data-name="Union">
                      <div className="absolute inset-[-79.82%_-141.83%_-159.63%_-141.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgUnion1} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 flex items-center justify-center ml-[1.76px] mt-[1.76px] relative row-1 size-[36.095px]" data-node-id="2642:2657">
                  <div className="-rotate-20 flex-none">
                    <div className="bg-[#ffb3d6] relative rounded-[7.04px] size-[28.162px]">
                      <div className="absolute left-[2.96px] size-[22.233px] top-[3.71px]" data-node-id="2642:2658" data-name="Dessets 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDessets1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[9.17px] mt-[5px] place-items-start relative row-1" data-node-id="2642:2659">
                <div className="col-1 h-[42.648px] ml-0 mt-0 relative row-1 w-[36px]" data-node-id="2642:2660" data-name="Union">
                  <div className="absolute inset-[-56.27%_-88.89%_-93.79%_-88.89%]">
                    <img alt="" className="block max-w-none size-full" src={imgUnion2} />
                  </div>
                </div>
                <div className="bg-[#ff80b8] col-1 ml-[2px] mt-[2px] relative rounded-[8px] row-1 size-[32px]" data-node-id="2642:2663">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.33px)] size-[28px] top-1/2" data-node-id="2675:1869" data-name="Dosa 3">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDosa3} />
                  </div>
                </div>
              </div>
              <div className="bg-white col-1 ml-[33.17px] mt-0 relative rounded-[888px] row-1 size-[16px]" data-node-id="2642:2665">
                <p className="[word-break:break-word] absolute font-['Figtree'] font-bold leading-[normal] left-[4.89px] right-[5.78px] text-[10.667px] text-black top-[1.78px] tracking-[-0.64px]" data-node-id="2642:2666">
                  4
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white content-stretch flex items-center justify-center overflow-clip px-[6px] relative rounded-[12px] shadow-[0px_16px_48px_0px_rgba(0,0,0,0.14),0px_8px_24px_0px_rgba(0,0,0,0.1)] shrink-0" data-node-id="2642:2667">
            <p className="[word-break:break-word] font-['Figtree'] font-medium leading-[18px] relative shrink-0 text-[10px] text-black tracking-[-0.2px] whitespace-nowrap" data-node-id="2642:2668" style={{ fontFeatureSettings: '"dlig" 1' }}>
              Tamil Nadu
            </p>
          </div>
        </div>
        <div className="absolute content-stretch flex inset-[63.12%_67.91%_25.53%_8.89%] items-center justify-center" data-node-id="2642:2669">
          <div className="bg-white content-stretch flex items-center justify-center mr-[-1px] overflow-clip px-[6px] relative rounded-[12px] shadow-[0px_16px_48px_0px_rgba(0,0,0,0.14),0px_8px_24px_0px_rgba(0,0,0,0.1)] shrink-0" data-node-id="2642:2670">
            <p className="[word-break:break-word] font-['Figtree'] font-medium leading-[18px] relative shrink-0 text-[10px] text-black tracking-[-0.2px] whitespace-nowrap" data-node-id="2642:2671" style={{ fontFeatureSettings: '"dlig" 1' }}>
              Karnataka
            </p>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="2642:2672">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-node-id="2642:2673">
              <div className="col-1 h-[4px] ml-[7.17px] mt-[46px] relative row-1 w-[40px]" data-node-id="2642:2674">
                <div className="absolute inset-[-125%_-12.5%]">
                  <img alt="" className="block max-w-none size-full" src={imgEllipse1} />
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] h-[44.811px] inline-grid ml-[12.14px] mt-[6px] place-items-start relative row-1 w-[40.8px]" data-node-id="2642:2675">
                <div className="col-1 flex h-[44.811px] items-center justify-center ml-0 mt-0 relative row-1 w-[40.8px]" data-node-id="2642:2676">
                  <div className="flex-none rotate-16">
                    <div className="h-[37.532px] relative w-[31.682px]" data-name="Union">
                      <div className="absolute inset-[-79.82%_-141.83%_-159.63%_-141.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgUnion} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 flex items-center justify-center ml-[1.76px] mt-[1.76px] relative row-1 size-[34.833px]" data-node-id="2642:2679">
                  <div className="flex-none rotate-16">
                    <div className="bg-[#ffb3d6] relative rounded-[7.04px] size-[28.162px]">
                      <div className="absolute left-[2.96px] size-[22.233px] top-[3.71px]" data-node-id="2642:2680" data-name="Dessets 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDessets1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] h-[46.105px] inline-grid ml-0 mt-[6.2px] place-items-start relative row-1 w-[42.608px]" data-node-id="2642:2681">
                <div className="col-1 flex h-[46.105px] items-center justify-center ml-0 mt-0 relative row-1 w-[42.608px]" data-node-id="2642:2682">
                  <div className="-rotate-20 flex-none">
                    <div className="h-[37.532px] relative w-[31.682px]" data-name="Union">
                      <div className="absolute inset-[-79.82%_-141.83%_-159.63%_-141.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgUnion1} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 flex items-center justify-center ml-[1.76px] mt-[1.76px] relative row-1 size-[36.095px]" data-node-id="2642:2685">
                  <div className="-rotate-20 flex-none">
                    <div className="bg-[#ffb3d6] relative rounded-[7.04px] size-[28.162px]">
                      <div className="absolute left-[2.96px] size-[22.233px] top-[3.71px]" data-node-id="2642:2686" data-name="Dessets 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDessets1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[9.17px] mt-[5px] place-items-start relative row-1" data-node-id="2642:2687">
                <div className="col-1 h-[42.648px] ml-0 mt-0 relative row-1 w-[36px]" data-node-id="2642:2688" data-name="Union">
                  <div className="absolute inset-[-56.27%_-88.89%_-93.79%_-88.89%]">
                    <img alt="" className="block max-w-none size-full" src={imgUnion2} />
                  </div>
                </div>
                <div className="bg-[#ff80b8] col-1 ml-[2px] mt-[2px] relative rounded-[8px] row-1 size-[32px]" data-node-id="2642:2691">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-0.17px)] size-[28px] top-1/2" data-node-id="2675:1876" data-name="Parotta 2">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgParotta2} />
                  </div>
                </div>
              </div>
              <div className="bg-white col-1 ml-[33.17px] mt-0 relative rounded-[888px] row-1 size-[16px]" data-node-id="2642:2693">
                <p className="[word-break:break-word] absolute font-['Figtree'] font-bold leading-[normal] left-[4.89px] right-[5.78px] text-[10.667px] text-black top-[1.78px] tracking-[-0.64px]" data-node-id="2642:2694">
                  5
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute content-stretch flex inset-[83.73%_63.57%_4.92%_16.7%] items-center justify-center" data-node-id="2642:2695">
          <div className="bg-white content-stretch flex items-center justify-center mr-[-1px] overflow-clip px-[6px] relative rounded-[12px] shadow-[0px_16px_48px_0px_rgba(0,0,0,0.14),0px_8px_24px_0px_rgba(0,0,0,0.1)] shrink-0" data-node-id="2642:2696">
            <p className="[word-break:break-word] font-['Figtree'] font-medium leading-[18px] relative shrink-0 text-[10px] text-black tracking-[-0.2px] whitespace-nowrap" data-node-id="2642:2697" style={{ fontFeatureSettings: '"dlig" 1' }}>
              Kerala
            </p>
          </div>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="2642:2698">
            <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-node-id="2642:2699">
              <div className="col-1 h-[4px] ml-[7.17px] mt-[46px] relative row-1 w-[40px]" data-node-id="2642:2700">
                <div className="absolute inset-[-125%_-12.5%]">
                  <img alt="" className="block max-w-none size-full" src={imgEllipse1} />
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] h-[44.811px] inline-grid ml-[12.14px] mt-[6px] place-items-start relative row-1 w-[40.8px]" data-node-id="2642:2701">
                <div className="col-1 flex h-[44.811px] items-center justify-center ml-0 mt-0 relative row-1 w-[40.8px]" data-node-id="2642:2702">
                  <div className="flex-none rotate-16">
                    <div className="h-[37.532px] relative w-[31.682px]" data-name="Union">
                      <div className="absolute inset-[-79.82%_-141.83%_-159.63%_-141.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgUnion} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 flex items-center justify-center ml-[1.76px] mt-[1.76px] relative row-1 size-[34.833px]" data-node-id="2642:2705">
                  <div className="flex-none rotate-16">
                    <div className="bg-[#ffb3d6] relative rounded-[7.04px] size-[28.162px]">
                      <div className="absolute left-[2.96px] size-[22.233px] top-[3.71px]" data-node-id="2642:2706" data-name="Dessets 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDessets1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] h-[46.105px] inline-grid ml-0 mt-[6.2px] place-items-start relative row-1 w-[42.608px]" data-node-id="2642:2707">
                <div className="col-1 flex h-[46.105px] items-center justify-center ml-0 mt-0 relative row-1 w-[42.608px]" data-node-id="2642:2708">
                  <div className="-rotate-20 flex-none">
                    <div className="h-[37.532px] relative w-[31.682px]" data-name="Union">
                      <div className="absolute inset-[-79.82%_-141.83%_-159.63%_-141.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgUnion1} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 flex items-center justify-center ml-[1.76px] mt-[1.76px] relative row-1 size-[36.095px]" data-node-id="2642:2711">
                  <div className="-rotate-20 flex-none">
                    <div className="bg-[#ffb3d6] relative rounded-[7.04px] size-[28.162px]">
                      <div className="absolute left-[2.96px] size-[22.233px] top-[3.71px]" data-node-id="2642:2712" data-name="Dessets 1">
                        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDessets1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[9.17px] mt-[5px] place-items-start relative row-1" data-node-id="2642:2713">
                <div className="col-1 h-[42.648px] ml-0 mt-0 relative row-1 w-[36px]" data-node-id="2642:2714" data-name="Union">
                  <div className="absolute inset-[-56.27%_-88.89%_-93.79%_-88.89%]">
                    <img alt="" className="block max-w-none size-full" src={imgUnion2} />
                  </div>
                </div>
                <div className="bg-[#ff80b8] col-1 ml-[2px] mt-[2px] relative rounded-[8px] row-1 size-[32px]" data-node-id="2642:2717">
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-0.17px)] size-[28px] top-1/2" data-node-id="2675:1872" data-name="South Indian 3">
                    <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSouthIndian3} />
                  </div>
                </div>
              </div>
              <div className="bg-white col-1 ml-[33.17px] mt-0 relative rounded-[888px] row-1 size-[16px]" data-node-id="2642:2719">
                <p className="[word-break:break-word] absolute font-['Figtree'] font-bold leading-[normal] left-[4.89px] right-[5.78px] text-[10.667px] text-black top-[1.78px] tracking-[-0.64px]" data-node-id="2642:2720">
                  3
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-white border border-[#e8e8e8] border-solid bottom-0 content-stretch flex flex-col gap-[6px] items-center left-1/2 overflow-clip pb-[16px] pt-[6px] px-[12px] rounded-tl-[20px] rounded-tr-[20px] shadow-[0px_16px_48px_0px_rgba(0,0,0,0.14),0px_8px_24px_0px_rgba(0,0,0,0.1)] w-[390px]" data-node-id="2683:133">
        <div className="bg-[#f3f3f3] h-[5px] relative rounded-[999px] shrink-0 w-[36px]" data-node-id="2683:134" />
        <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full" data-node-id="2683:135">
          <div className="opacity-90 relative shrink-0 size-[50px]" data-node-id="2702:301" data-name="Hand tap 2">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHandTap2} />
          </div>
          <div className="content-stretch flex flex-col items-center relative shrink-0 w-[278px]" data-node-id="2683:161">
            <p className="[word-break:break-word] font-['Figtree'] font-medium leading-[normal] relative shrink-0 text-[#5d5d5d] text-[15px] text-center w-full" data-node-id="2683:162" style={{ fontFeatureSettings: '"dlig" 1' }}>
              Tap on state to discover regional flavours
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bg-[rgba(0,0,0,0.4)] content-stretch flex items-center justify-center left-[12px] rounded-[999px] size-[36px] top-[36px]" data-node-id="2693:293">
        <div className="relative shrink-0 size-[24px]" data-node-id="2693:294" data-name="arrow_left_alt">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowLeftAlt} />
        </div>
      </div>
    </div>
  );
}
