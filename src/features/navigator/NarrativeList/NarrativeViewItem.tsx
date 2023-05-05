import { FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as timeago from 'timeago.js';
import { useAppSelector } from '../../../common/hooks';
import { NarrativeDoc } from '../../../common/types/NarrativeDoc';
import { getParams } from '../../../features/params/paramsSlice';
import { narrativePath, navigatorParams } from '../common';
import { categorySelected } from '../navigatorSlice';
import NarrativeItemDropdown from './NarrativeItemDropdown';
import classes from './NarrativeList.module.scss';

export interface NarrativeViewItemProps {
  idx: number;
  item: NarrativeDoc;
  showVersionDropdown: boolean;
  activeOverride?: boolean;
  onSelectItem?: (idx: number) => void;
  onUpaChange?: (upa: string) => void;
}

/*
TODO: Version selection should only show up when the specific doc is selected.
This is true in the narrative listing when no doc is specified, and at least
one exists. This is always true for the NarrativeView component.
*/
const NarrativeViewItem: FC<NarrativeViewItemProps> = ({
  activeOverride,
  idx,
  item,
  onUpaChange,
  showVersionDropdown,
}) => {
  const categorySet = useAppSelector(categorySelected);
  const europaParams = useAppSelector(getParams);
  const {
    id = null,
    obj = null,
    ver = null,
  } = useParams<{ id: string; obj: string; ver: string }>();
  const { access_group, creator, narrative_title, obj_id, timestamp, version } =
    item;
  const upa = `${access_group}/${obj_id}/${version}`;
  // eslint-disable-next-line no-console
  console.log({ item });
  // const versionActive = Number(ver) > 0 ? Number(ver) : version;
  const active = access_group.toString() === id && obj_id.toString() === obj;
  const status = active ? 'active' : 'inactive';
  // Note: timeago expects milliseconds
  const timeElapsed = timeago.format(timestamp);
  function handleVersionSelect(version: number) {
    onUpaChange?.(`${access_group}/${obj_id}/${version}`);
  }

  const navigatorParamsCurrent = Object.fromEntries(
    navigatorParams.map((param) => [param, europaParams[param]])
  );
  const narrativeViewItemPath = (version: number) => {
    const categoryPath = categorySet !== 'own' ? categorySet : null;
    return narrativePath({
      categoryPath,
      extraParams: navigatorParamsCurrent,
      id: access_group.toString(),
      obj: obj_id.toString(),
      ver: version.toString(),
    });
  };

  const pathVersion = active ? Number(ver) : version;
  const path = narrativeViewItemPath(pathVersion);
  return (
    <section key={idx}>
      <Link
        to={path}
        className={`${classes.narrative_item_outer} ${classes[status]}`}
      >
        <div className={classes.narrative_item_inner}>
          <div className={classes.narrative_item_text}>
            <div>{narrative_title}</div>
            <NarrativeItemDropdown
              narrative={upa}
              onVersionSelect={(e) => handleVersionSelect(e)}
              visible={Boolean(showVersionDropdown && active)}
              version={pathVersion}
            />
          </div>
          <div className={classes.narrative_item_details}>
            Updated {timeElapsed} by {creator}
          </div>
        </div>
      </Link>
    </section>
  );
};

export default NarrativeViewItem;
