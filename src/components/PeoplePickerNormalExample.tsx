import * as React from 'react';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import {
  IBasePickerSuggestionsProps,
  IPeoplePickerItemSelectedProps,
  NormalPeoplePicker,
  PeoplePickerItem,
  ValidationState,
} from '@fluentui/react/lib/Pickers';
// import { people, mru } from '@fluentui/example-data';

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested People',
  mostRecentlyUsedHeaderText: 'Suggested Contacts',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading',
  showRemoveButtons: true,
  suggestionsAvailableAlertText: 'People Picker Suggestions available',
  suggestionsContainerAriaLabel: 'Suggested contacts',
};

const checkboxStyles = {
  root: {
    marginTop: 10,
  },
};

const members = [
  {
    "id": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
    "text": "MOD Administrator",
    "secondaryText": "admin@M365x86451899.onmicrosoft.com",
    "imageInitials": "MA"
  },
  {
    "id": "a237d5db-7b92-42c4-a66f-f70743013a01",
    "text": "Adele Vance",
    "secondaryText": "AdeleV@M365x86451899.OnMicrosoft.com",
    "imageInitials": "AV",
    "key": "undefined"
  },
  {
    "id": "1b003421-b31b-472e-ac38-4093c8353cfa",
    "text": "MOD Administrator",
    "secondaryText": "admin@m365x53068480.onmicrosoft.com",
    "imageInitials": "MA",
    "key": "undefined"
  },
  {
    "id": "9bedbebc-1d1c-4de5-b7c7-3411500b01c6",
    "text": "Alex Wilber",
    "secondaryText": "AlexW@M365x86451899.OnMicrosoft.com",
    "imageInitials": "AW",
    "key": "undefined"
  },
  {
    "id": "b1fd0d8b-5afa-4f79-aa70-c474d06c1f77",
    "text": "Grady Archie",
    "secondaryText": "GradyA@M365x86451899.OnMicrosoft.com",
    "imageInitials": "GA",
    "key": "undefined"
  }
]


export const PeoplePickerNormalExample: React.FunctionComponent<any> = (props: any) => {
  const [delayResults, setDelayResults] = React.useState(false);
  const [isPickerDisabled, setIsPickerDisabled] = React.useState(true);
  const [showSecondaryText, setShowSecondaryText] = React.useState(false);
  const [mostRecentlyUsed, setMostRecentlyUsed] = React.useState<IPersonaProps[]>(members);
  const [peopleList, setPeopleList] = React.useState<IPersonaProps[]>(members);
  const [isPrinting, setIsPrinting] = React.useState<boolean>(false);

  const picker = React.useRef(null);

  const onFilterChanged = (
    filterText: string,
    currentPersonas: IPersonaProps[],
    limitResults?: number,
  ): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (filterText) {
      let filteredPersonas: IPersonaProps[] = filterPersonasByText(filterText);

      filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults ? filteredPersonas.slice(0, limitResults) : filteredPersonas;
      return filterPromise(filteredPersonas);
    } else {
      return [];
    }
  };

  const filterPersonasByText = (filterText: string): IPersonaProps[] => {
    return peopleList.filter(item => doesTextStartWith(item.text as string, filterText));
  };

  const filterPromise = (personasToReturn: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> => {
    if (delayResults) {
      return convertResultsToPromise(personasToReturn);
    } else {
      return personasToReturn;
    }
  };

  const returnMostRecentlyUsed = (currentPersonas: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> => {
    return filterPromise(removeDuplicates(mostRecentlyUsed, currentPersonas));
  };

  const onRemoveSuggestion = (item: IPersonaProps): void => {
    const indexPeopleList: number = peopleList.indexOf(item);
    const indexMostRecentlyUsed: number = mostRecentlyUsed.indexOf(item);

    if (indexPeopleList >= 0) {
      const newPeople: IPersonaProps[] = peopleList
        .slice(0, indexPeopleList)
        .concat(peopleList.slice(indexPeopleList + 1));
      setPeopleList(newPeople);
    }

    if (indexMostRecentlyUsed >= 0) {
      const newSuggestedPeople: IPersonaProps[] = mostRecentlyUsed
        .slice(0, indexMostRecentlyUsed)
        .concat(mostRecentlyUsed.slice(indexMostRecentlyUsed + 1));
      setMostRecentlyUsed(newSuggestedPeople);
    }
  };

  const renderItemWithSecondaryText = (props: IPeoplePickerItemSelectedProps) => {
    const newProps = {
      ...props,
      item: {
        ...props.item,
        ValidationState: ValidationState.valid,
        showSecondaryText: true,
      },
    };
    // return(<></>)
    return <PeoplePickerItem {...newProps} />;
  };

  const onDisabledButtonClick = (): void => {
    setIsPickerDisabled(!isPickerDisabled);
  };

  const onToggleDelayResultsChange = (): void => {
    setDelayResults(!delayResults);
  };

  const onToggleShowSecondaryText = (): void => {
    setShowSecondaryText(!showSecondaryText);
  };
  const keydownHandler = (e) => {
    console.log(e)
    if (e.ctrlKey && e.code == "KeyP") setIsPrinting(true);
    setTimeout(() => setIsPrinting(false), 1500)
  };

  const onafterPrint = (e) => {
    console.log(e);
  }
  React.useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('onafterprint', onafterPrint);
    return () => {
      document.removeEventListener('keydown', keydownHandler);
      document.removeEventListener('onafterprint', onafterPrint);
    }
  }, [])

  return (
    <div>
      <NormalPeoplePicker
        // eslint-disable-next-line react/jsx-no-bind
        onResolveSuggestions={onFilterChanged}
        // eslint-disable-next-line react/jsx-no-bind
        onEmptyInputFocus={returnMostRecentlyUsed}
        getTextFromItem={getTextFromItem}
        pickerSuggestionsProps={suggestionProps}
        className={'ms-PeoplePicker'}
        key={'normal'}
        // eslint-disable-next-line react/jsx-no-bind
        onRemoveSuggestion={onRemoveSuggestion}
        onRenderItem={showSecondaryText ? renderItemWithSecondaryText : undefined}
        onValidateInput={validateInput}
        selectionAriaLabel={'Selected contacts'}
        removeButtonAriaLabel={'Remove'}
        inputProps={{
          onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
          onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
          'aria-label': 'People Picker',
        }}
        componentRef={picker}
        onInputChange={onInputChange}
        resolveDelay={300}
        styles={{
          text: isPrinting && {
            "&::after": {
              background: "unset"
            }
          }
        }}
        onChange={props.onChange}
      />
      {/* <Checkbox
        label="Disable People Picker"
        checked={isPickerDisabled}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onDisabledButtonClick}
        styles={checkboxStyles}
      />
      <Checkbox
        label="Delay Suggestion Results"
        defaultChecked={delayResults}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onToggleDelayResultsChange}
        styles={checkboxStyles}
      />
      <Checkbox
        label="Show Secondary Text"
        defaultChecked={showSecondaryText}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onToggleShowSecondaryText}
        styles={checkboxStyles}
      /> */}
    </div>
  );
};

function doesTextStartWith(text: string, filterText: string): boolean {
  return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
}

function removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
  return personas.filter(persona => !listContainsPersona(persona, possibleDupes));
}

function listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
  if (!personas || !personas.length || personas.length === 0) {
    return false;
  }
  return personas.filter(item => item.text === persona.text).length > 0;
}

function convertResultsToPromise(results: IPersonaProps[]): Promise<IPersonaProps[]> {
  return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(results), 2000));
}

function getTextFromItem(persona: IPersonaProps): string {
  return persona.text as string;
}

function validateInput(input: string): ValidationState {
  if (input.indexOf('@') !== -1) {
    return ValidationState.valid;
  } else if (input.length > 1) {
    return ValidationState.warning;
  } else {
    return ValidationState.invalid;
  }
}

/**
 * Takes in the picker input and modifies it in whichever way
 * the caller wants, i.e. parsing entries copied from Outlook (sample
 * input: "Aaron Reid <aaron>").
 *
 * @param input The text entered into the picker.
 */
function onInputChange(input: string): string {
  const outlookRegEx = /<.*>/g;
  const emailAddress = outlookRegEx.exec(input);

  if (emailAddress && emailAddress[0]) {
    return emailAddress[0].substring(1, emailAddress[0].length - 1);
  }

  return input;
}
